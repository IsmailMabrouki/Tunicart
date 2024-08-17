import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../../services/models';
import { PublicService, SellerService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrl: './seller-products.component.scss'
})
export class SellerProductsComponent implements OnInit {
  @Input() products: Item[] = []; // List of best-selling products
  userId: string = '';

  constructor(
    private sellerService : SellerService,
    private tokenService : TokenService

  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id') as string;
    console.log('userId', this.userId);
    if (this.userId) {
      const numericUserId = parseInt(this.userId, 10); // Convertir la chaîne de caractères en nombre base 10

    this.fetchSellersProducts(numericUserId);}
  }
  
  hasRole(role: string): boolean {
    console.log(
      'role:',
      this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase()
    );
    let userRole = this.tokenService.userRoles;
    return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
  }


  fetchSellersProducts(userId: number): void {
    this.sellerService.getItemUserById({ UserId:  userId }).subscribe({
      next: (items: Item[]) => {
        // Assuming items are returned sorted by best-selling
        this.products = items;
        console.log('items : ', this.products);
      },
      error: (err) => {
        console.error('Error fetching items', err);
      },
    });
  }
}
