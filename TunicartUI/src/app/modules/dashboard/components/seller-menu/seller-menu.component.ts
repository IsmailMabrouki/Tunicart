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
   
    let userRole = this.tokenService.userRoles;
    return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
  }

  addProduct() {
    // Logic for adding a product
    this.router.navigate(['dashboard','item',this.userId])
    console.log('Add Product clicked');
  }

  viewOrders() {
    // Logic for viewing orders  'order-history/:id'
    this.router.navigate(['dashboard','order-history',this.userId])
    console.log('View Orders clicked');
  }

  viewActivityHistory() {
     // Logic for viewing Activity history   'activity-history/:id',
     this.router.navigate(['dashboard','activity-history',this.userId])
     console.log('View Activity History clicked');
    }

  manageProfile() {
    // Logic for managing profile
    this.router.navigate(['profile',this.userId])
    console.log('Manage Profile clicked');
  }

}
