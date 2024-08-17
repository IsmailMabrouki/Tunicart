import { Component, OnInit } from '@angular/core';
import { Feedback, FeedbackRequest, Item } from '../../services/models';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService, UserService } from '../../services/services';
import { AddItemToCart$Params } from '../../services/fn/user/add-item-to-cart';
import { TokenService } from '../../services/token/token.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  
  newReview = { rating: '', comment: ''};
  selectedQuantity: any;
  product: Item | undefined;
  productId : string | undefined;
  quantity : number = 0 ;
  userId : string | undefined;
  productImageUrl :any ; 
  private baseUrl = 'http://localhost:8088/api/v1/image/item/get/';
  constructor(
    private route: ActivatedRoute,
    private publicService : PublicService,
    private tokenService : TokenService,
    private userService : UserService,
    private http: HttpClient,
    private router : Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id === null ? undefined : id;
    this.userId = localStorage.getItem('id') as string;
    console.log('productID :', this.productId);
    console.log('userID :', this.userId);
    if (this.productId && this.userId) {
      const numericUserId = parseInt(this.userId, 10);
      const numproductId = parseInt(this.productId, 10);
      this.getItemImage(numproductId); //Get the product ID from the route
      this.publicService.getItemById2({id: numproductId}).subscribe(product => {
        this.product = product; 
        this.quantity = product.quantity ?? 0;
        console.log("this.product : ",  this.product);
// Set the product details
      });
    }
}


// Method to submit the review
submitReview() {
  if (this.newReview.rating && this.newReview.comment) {
    const review :FeedbackRequest = {
      comment: this.newReview.comment,
      rating: parseInt(this.newReview.rating,10)
    };
    if (this.productId && this.userId) {
    const numproductId = parseInt(this.productId, 10);
    this.userService.saveFeedbackForItem({itemId : numproductId, body : review}).subscribe({
      next : (response) => {
        console.log("response: ",response);
      },
      error: (err) => {
        console.error('Error submitting review:', err);
      }
    });
    }
    }
this.newReview = { rating: '', comment: '' };
window.location.reload(); // Reset the form
}


getItemImage(itemID: number): void {
  this.getImageByIdUser({ itemID: itemID }).subscribe({
    next: (data: Blob) => {
      // Create a URL for the Blob and assign it to profileImageUrl
      this.productImageUrl = URL.createObjectURL(data);
    },
    error: (err) => {
      console.error('Error fetching image:', err);
    }
  });
}

getImageByIdUser(params: { itemID: number }): Observable<Blob> {
  return this.http.get(`${this.baseUrl}${params.itemID}`, { responseType: 'blob' });
}



hasRole(role: string): boolean {
  console.log(
    'role:',
    this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase()
  );
  let userRole = this.tokenService.userRoles;
  return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
}

addToCart( productId: number | undefined) {
  if (this.userId && this.product?.quantity){
  let userId:number = parseInt(this.userId, 10);
  if (this.selectedQuantity > this.product.quantity) {
    alert('Quantity exceeds available stock.');
    return;
  }
  
  const params: AddItemToCart$Params = {
    userId: userId,
    body: { itemId : productId , quantity: this.selectedQuantity}
  };
  
  this.userService.addItemToCart$Response(params)
    .subscribe({
      next: () => {
        alert('Product added to cart successfully.');
        this.router.navigate(['dashboard','cart', userId]);
      },
      error: (error) => {
        console.error('Error adding product to cart', error);
      }
    });
  }
}

updateProduct(productId: number | undefined): void {
  if (productId !== undefined) {
    // Navigate to UpdateProductComponent with product ID
    this.router.navigate(['dashboard','update-product', productId]);
  } else {
    console.error('Invalid product ID');
  }
}

}