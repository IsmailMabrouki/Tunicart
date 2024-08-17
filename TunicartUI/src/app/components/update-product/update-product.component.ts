import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicService, SellerService } from '../../services/services';
import { Item } from '../../services/models/item';
import { ItemRequest } from '../../services/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup;
  productId: number | undefined;
  selectedFile: File | null = null;
  userId: string | undefined;
  private apiUrl = 'http://localhost:8088/api/v1/image/item/upload';

  constructor(
    private route: ActivatedRoute,
    private publicService: PublicService,
    private sellerService: SellerService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      category: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id ? parseInt(id, 10) : undefined;
    this.userId = localStorage.getItem('id') as string;

    console.log('productID:', this.productId);
    console.log('userID:', this.userId);

    if (this.productId && this.userId) {
      this.publicService.getItemById2({ id: this.productId }).subscribe(
        product => {
          this.productForm.patchValue({
            name: product.name,
            price: product.price,
            quantity: product.quantity ?? 0,
            description: product.description,
            category: product.category?.name
          });
        },
        error => {
          console.error('Error fetching product:', error);
          // Handle error, e.g., navigate back or show an error message
        }
      );
    } else {
      console.error('Invalid product ID or user ID');
      // Handle invalid ID case
    }
  }

  updateProduct(): void {
    if (this.productForm.valid) {
      const updatedProduct: ItemRequest = {
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        quantity: this.productForm.value.quantity,
        description: this.productForm.value.description,
        category: this.productForm.value.category,
        sellerId: this.userId ? parseInt(this.userId, 10) : undefined
      };
  
      if (this.productId) {
        this.sellerService.updateItem({ ItemId: this.productId, body: updatedProduct }).subscribe({
          next: (response) => {
            console.log('Product updated successfully:', response);
            // Navigate or show success message
            this.router.navigate(['/products-list']); // Adjust navigation as needed
          },
          error: (error) => {
            console.error('Error updating product:', error);
            // Handle error
          },
          complete: () => {
            console.log('Update operation completed');
            // Handle completion if necessary
          }
        });
      }
    }
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
    } else {
      this.selectedFile = null;
    }
  }



  uploadProfileImage(): void {
    console.log('clicked upload method');
    if (this.selectedFile && this.productId) {
      const formData = new FormData();
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);
      const httpOptions = {
        headers: new HttpHeaders({        
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data' 
        })
      };
  
      this.http.post(`${this.apiUrl}/${this.productId}`, formData, httpOptions).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully', response);
          alert('Image uploaded successfully');
          window.location.reload();

          
        },
        error: (err) => {
          console.error('Error uploading image:', err);
        }
      });
    } else {
      console.error('No file selected or product ID is missing');
    }
  }
}
