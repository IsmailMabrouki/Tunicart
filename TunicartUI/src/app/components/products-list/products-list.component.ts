import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../services/models';
import { PublicService } from '../../services/services';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  @Input() products: Item[] = []; // List of best-selling products
  filteredProducts: Item[] = [];
  categories: string[] = []; // List of categories
  selectedCategory: string = '';
  sortCriteria: string = 'name-asc';

  constructor(private publicservice: PublicService) {}

  ngOnInit(): void {
    this.fetchBestSellers();
  }

  fetchBestSellers(): void {
    this.publicservice.getAllItems2().subscribe({
      next: (items: Item[]) => {
        this.products = items;
        console.log("this.products : ",this.products);
        this.filteredProducts = [...this.products];
        this.extractCategories();
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error fetching items', err);
      },
    });
  }

  extractCategories(): void {
    // Extract unique categories, ensuring no undefined values
    const allCategories = this.products.map(item => item.category?.name).filter(category => category !== undefined) as string[];
    this.categories = Array.from(new Set(allCategories));
  }

  applyFilters(): void {
    this.filteredProducts = this.products
      .filter(item => !this.selectedCategory || item.category?.name === this.selectedCategory)
      .sort((a, b) => this.sortItems(a, b));
  }

  sortItems(a: Item, b: Item): number {
    switch (this.sortCriteria) {
      case 'name-asc':
        return (a.name ?? '').localeCompare(b.name ?? '');
      case 'name-desc':
        return (b.name ?? '').localeCompare(a.name ?? '');
      case 'price-asc':
        return (a.price ?? 0) - (b.price ?? 0);
      case 'price-desc':
        return (b.price ?? 0) - (a.price ?? 0);
      default:
        return 0;
    }
  }
}
