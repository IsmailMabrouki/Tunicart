import { Component, Input } from '@angular/core';
import { Item } from '../../services/models';
import { PublicService } from '../../services/services';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.scss'
})
export class NewArrivalsComponent {
  @Input() products: Item[] = []; // List of best-selling products

  constructor(private publicservice : PublicService) {}

  ngOnInit(): void {
    this.fetchBestSellers();
  }

  fetchBestSellers(): void {
    this.publicservice.getAllItems2().subscribe({
      next: (items: Item[]) => {
        // Assuming items are returned sorted by best-selling
        // Sort items by price in ascending order
        const sortedItems = items.sort((a, b) => {
          // Use a default value of Infinity if price is undefined
          const priceA = a.price ?? Infinity;
          const priceB = b.price ?? Infinity;

          return priceA - priceB;
        });

        // Select the cheapest 8 products
        this.products = sortedItems.slice(0, 8);
        console.log('items : ', this.products);
      },
      error: (err) => {
        console.error('Error fetching items', err);
      },
    });
  }
}
