import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../../services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-menu',
  templateUrl: './seller-menu.component.html',
  styleUrl: './seller-menu.component.scss'
})
export class SellerMenuComponent implements OnInit{
  userId: string ='';

constructor(
  private tokenService: TokenService,
  private router: Router
){}

  

  ngOnInit(): void {
    this.userId = localStorage.getItem('id') as string;  }

  hasRole(role: string): boolean {
    console.log(
      'role:',
      this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase()
    );
    let userRole = this.tokenService.userRoles;
    return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
  }

  addProduct() {
    // Logic for adding a product
    this.router.navigate(['dashboard','item',this.userId])
    console.log('Add Product clicked');
  }

  viewOrders() {
    // Logic for viewing orders
    console.log('View Orders clicked');
  }

  manageProfile() {
    // Logic for managing profile
    this.router.navigate(['profile',this.userId])
    console.log('Manage Profile clicked');
  }

}
