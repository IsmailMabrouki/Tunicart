import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: any; // Define the shape of the product object as needed
  productId: number = -1 ;
  productImageUrl : any; 
  private baseUrl = 'http://localhost:8088/api/v1/image/item/get/';
  averageRating: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient
  ){}
  ngOnInit(): void {
    if (this.product) {
      this.productId = this.product.id;
      this.getItemImage(this.productId);
      this.calculateAverageRating();
    }
  }
 
calculateAverageRating(): void {
  if (this.product && this.product.feedbacks && this.product.feedbacks.length > 0) {
    const total = this.product.feedbacks.reduce((sum : number, feedback :any) => sum + feedback.rating, 0);
    this.averageRating = total / this.product.feedbacks.length;
  } else {
    this.averageRating = 0; // No reviews, so no rating
  }
}
  
getItemImage(itemID: number): void {
  this.getImageByIdUser({ itemID: itemID }).subscribe({
    next: (data: Blob) => {
      // Create a URL for the Blob and assign it to profileImageUrl
      this.productImageUrl = URL.createObjectURL(data);
    },
    error: (err: any) => {
      console.error('Error fetching image:', err);
    }
  });
}

getImageByIdUser(params: { itemID: number }): Observable<Blob> {
  return this.http.get(`${this.baseUrl}${params.itemID}`, { responseType: 'blob' });
}

 
  viewDetails(productId: number): void {
    this.router.navigate(['product-details', productId]);
  }
}
