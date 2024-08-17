import { Component, Input, OnInit } from '@angular/core';
import { PublicService } from '../../services/services';
import { Item } from '../../services/models';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss'
})
export class FeaturedProductsComponent implements OnInit {

  @Input() products: Item[] = []; // List of best-selling products
  
  constructor(private publicservice: PublicService) {}

  ngOnInit(): void {
    this.fetchBestSellers();
    
  }

   


  calculateAverageRating(product: Item): number {
    if (product.feedbacks && product.feedbacks.length > 0) {
      const total = product.feedbacks.reduce((sum : number, feedback :any) => sum + feedback.rating, 0);
      return total / product.feedbacks.length;
    } else {
      return 0; // No reviews, so no rating
    }
  }
  
  // filterProductsByRating(): void {
  //   this.filteredProducts = this.products.filter(product => this.calculateAverageRating(product) > 4);
  //   console.log("filtered product: ",this.filteredProducts);
  // }

  fetchBestSellers(): void {
    this.publicservice.getAllItems2().subscribe({
      next: (items: Item[]) => {
        // Assuming items are returned sorted by best-selling
        const Items = items.filter(product => this.calculateAverageRating(product) > 4);
        this.products = Items.slice(0, 8);
        console.log('items : ' , this.products);
      },
      error: (err) => {
        console.error('Error fetching items', err);
      }
    });
  }
}
