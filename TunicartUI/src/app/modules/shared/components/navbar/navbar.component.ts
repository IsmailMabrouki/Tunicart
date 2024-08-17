import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../../services/token/token.service';
import { Router } from '@angular/router';
import { PublicService, UserService } from '../../../../services/services';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { Item } from '../../../../services/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {

  searchControl = new FormControl();
  searchResults$: Observable<Array<Item>> = new Observable();
  searchResults: Array<Item> = [];
  searchQuery: string = '';
  isAuthenticated: boolean = false;
  cartItemCount: number = 0;
  cartItems: any[] = []; // Replace 'any' with your actual item type
  userId: string = '';
  username :string = '';
  profileImageUrl: any;
  hasReloaded : boolean = false;
  private baseUrl = 'http://localhost:8088/api/v1/image/user/get/';


  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private publicService: PublicService,
    private router: Router,
    private http: HttpClient,
  ) {}


  ngOnInit(): void {
    this.isAuthenticated = this.tokenService.isTokenValid();
    console.log('Is Authenticated:', this.isAuthenticated);
    if (this.isAuthenticated) {
      this.userId = localStorage.getItem('id') as string;
    }
    if (this.userId) {
      const numericUserId = parseInt(this.userId, 10); // Convertir la chaîne de caractères en nombre base 10
      this.loadCartItems(numericUserId);
      this.getImage(numericUserId);
    }
    
    this.tokenService.userFullName$.subscribe(fullName => {
      this.username = fullName;
    });
    console.log('username:', this.username);
    if (localStorage.getItem('hasReloaded') === 'true') {
      // Page has already been reloaded
      this.hasReloaded = true;
    } else {
      // Set the flag and reload the page
      localStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    }

    this.searchResults$ = this.searchControl.valueChanges.pipe(
      debounceTime(300), // Wait for the user to stop typing for 300ms
      distinctUntilChanged(), // Only proceed if the query has changed
      switchMap((query: string) => this.publicService.searchItems1({ query }))
    );
  }

  goToProduct(productId: number | undefined): void {
    if (productId !== undefined) {
    this.router.navigate(['product-details',productId]).then(() => {
      window.location.reload(); // Force a page reload
    });
    }
  }

  onSearch(query: string): void {
    if (query) {
      this.publicService.searchItems1({ query }).subscribe({
      next:  (items: Array<Item>) => {
          this.searchResults = items;
          this.searchResults$ = of(items); // Convert items array to an Observable
        },
        error: (err: any ) => {
          console.error('Error occurred while searching items:', err);
        }
    });
    }
  }
  
  getImage(userId: number): void {
    this.getImageByIdUser({ idUser: userId }).subscribe({
      next: (data: Blob) => {
        // Create a URL for the Blob and assign it to profileImageUrl
        this.profileImageUrl = URL.createObjectURL(data);
      },
      error: (err: any) => {
        console.error('Error fetching image:', err);
      }
    });
  }

  
  getImageByIdUser(params: { idUser: number }): Observable<Blob> {
    return this.http.get(`${this.baseUrl}${params.idUser}`, { responseType: 'blob' });
  }

  getProfile() {
    console.log('Navigating to:', ['profile', this.userId]);
    this.router
      .navigate(['profile', this.userId])
      .then((success) => console.log('Navigation successful:', success))
      .catch((err) => console.error('Navigation error:', err));
  }


  loadCartItems(id: number): void {
    if(this.hasRole('user')){
    this.userService.getCart({ UserId: id }).subscribe(response => {
      // Type assertion to 'any'
      const cartResponse = response as any;
  
      // Optional chaining to safely access nested properties
      if (cartResponse?.items) {
        this.cartItems = cartResponse.items;
        console.log('Cart Items:', this.cartItems);
        this.cartItemCount = this.cartItems.length;
        console.log("cartItemlength : ",this.cartItems.length);
        localStorage.setItem('hasReloaded', 'false');
        // Example access to properties
        this.cartItems.forEach((cartItem: any) => {
          console.log('Item Name:', cartItem.item?.name);
          console.log('Item Price:', cartItem.item?.price);
          console.log('Item Quantity:', cartItem.quantity);
        });
  
      } else {
        this.cartItems = []; // Fallback in case of unexpected structure
      }
    });
  }
  }

  gotoCart() {
    console.log('Navigating to:', ['user N : ', this.userId]);
    this.router
      .navigate(['dashboard','cart', this.userId])
      .then((success) => console.log('Navigation successful:', success))
      .catch((err) => console.error('Navigation error:', err));
  }

  addProduct() {
    // Logic for adding a product
    this.router.navigate(['dashboard','item',this.userId])
    console.log('Add Product clicked');
  }

  hasRole(role: string): boolean {
    console.log(
      'role:',
      this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase()
    );
    let userRole = this.tokenService.userRoles;
    return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
  }

  logout() {
    this.isAuthenticated = false;
    this.tokenService.clearTokens();
    window.location.reload();
  }
}
