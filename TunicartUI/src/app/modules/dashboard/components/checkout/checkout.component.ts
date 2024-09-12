import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  ProfileService, UserService } from '../../../../services/services';
import {  OrderRequest, ProfileResponse, User } from '../../../../services/models';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

 

  billingForm!: FormGroup;
  userId: string | undefined;
  loading: boolean | undefined;
  cartItems: any[] = []; // Replace 'any' with your actual item type
  totalAmount: number = 0;
  user: any | undefined | null;
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private ProfileService: ProfileService,
    private route :ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id === null ? undefined : id;
    console.log('userId', this.userId);
    if (this.userId) {
      const numericUserId = parseInt(this.userId, 10); // Convertir la chaîne de caractères en nombre base 10
      this.loadCartItems(numericUserId);
      this.getProfile(numericUserId);
    }
   
  }

  
  

  initializeForms1(user: any): void {
    if (!this.billingForm) {
        this.billingForm = this.fb.group({
            fullName:[ user.fullName, Validators.required],
            email: [ user.email, [Validators.required, Validators.email]],
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            postalCode: ['', Validators.required],
            country: ['', Validators.required],
        });
    }
    console.log('Form Initialized:', this.billingForm.value); 
 
}

  

  loadCartItems(id: number): void {
    this.userService.getCart({ UserId: id }).subscribe(response => {
      // Type assertion to 'any'
      const cartResponse = response as any;
  
      // Optional chaining to safely access nested properties
      if (cartResponse?.items) {
        this.cartItems = cartResponse.items;
        console.log('Cart Items:', this.cartItems);
  
        // Example access to properties
        this.cartItems.forEach((cartItem: any) => {
          console.log('Item Name:', cartItem.item?.name);
          console.log('Item Price:', cartItem.item?.price);
          console.log('Item Quantity:', cartItem.quantity);
        });
  
        this.calculateTotal();
      } else {
        this.cartItems = []; // Fallback in case of unexpected structure
      }
    });
  }

  
  
  getProfile(userId: number): void {
    this.loading = true;
    this.ProfileService.getProfile({userId : userId})
      .pipe(
        catchError((error) => {
          console.error('Error fetching user details:', error);
          this.loading = false;
          return of(null); // Retourner une valeur de repli ou un observable vide
        })
      )
      .subscribe({
        next: (profileResponse: ProfileResponse | null) => {
          if (profileResponse && profileResponse.data) {
            this.user = profileResponse?.data;; // Extraire les détails de l'utilisateur depuis la réponse
            this.initializeForms1(this.user);
          } else {
            this.user = null; // Assurez-vous que `this.user` est défini correctement
          }
          this.loading = false;
          console.log('checkout User profile: ', this.user);
        },
      });
  }
  


  calculateTotal(): number {
    this.totalAmount = this.cartItems.reduce((sum, cartItem) => 
      sum + (cartItem.item?.price || 0) * cartItem.quantity, 0);
    return this.totalAmount;
  }


  submitOrder(): void {
    if (this.billingForm.valid ) {
      const orderData = {
        billingInfo: this.billingForm.value,
        totalAmount: this.totalAmount,
        cartItems: this.cartItems
      };
  
  
  // Create an OrderRequest object
  const orderRequest: OrderRequest = {
    deliveryAddress: {
      street: orderData.billingInfo.street,
      city: orderData.billingInfo.city,
      state: orderData.billingInfo.state,
      postalCode: orderData.billingInfo.postalCode,
      country: orderData.billingInfo.country,
    },
    userId: this.user?.id, // Assuming you have the user's ID available
    totalAmount: this.calculateTotal(), // Assuming you have a method to calculate total amount
    item_id: this.getItemIds(), // Assuming you have a method to get item IDs
  };
  this.userService.placeOrder({ body: orderRequest }).subscribe({
    next: response => {console.log('Order placed successfully', response),alert('Order placed successfully')},
    error: error => console.error('Error placing order', error),
    complete: () => console.log('Order placement completed'),
});

      // Submit the orderData to your backend or navigate to confirmation
      console.log('Order Data:', orderData);
        // Store the amount in local storage
        
     localStorage.setItem('paymentAmount', orderData.totalAmount.toString());

      this.router.navigate(['dashboard', 'payment',this.userId]);
    } else {
      alert('Please fill out all required fields.');
    }
  }


  getItemIds(): number[] {
    // Extract the item IDs from the cartItems
    return this.cartItems
      .map(cartItem => cartItem.item?.id)  // Access the item id
      .filter(id => id !== undefined) as number[]; // Filter out undefined ids and cast to number[]
  }
  


}