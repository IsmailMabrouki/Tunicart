import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/services';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'] // Add a CSS file if needed
})
export class PaymentComponent implements OnInit {
  stripe: Stripe | null = null;
  cardElement: StripeCardElement | null = null;
  clientSecret: string | null = null;

  // Define the amount to be charged in the smallest currency unit (e.g., cents)
  amount: number = 0; // Amount in cents
  storedAmount: number = 0;
  userId: string | undefined;
  numericUserId : number = -1;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,

  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id === null ? undefined : id;
    console.log('userId', this.userId);
    if (this.userId) {
      this.numericUserId = parseInt(this.userId, 10);
    }
    this.initializeStripe();
  
    const storedAmount1 = localStorage.getItem('paymentAmount');
    if (storedAmount1) {
      console.log('Stored payment amount (in dollars):', storedAmount1);
      this.storedAmount = parseFloat(storedAmount1);

      // Convert dollars to cents
      this.amount = Math.round(this.storedAmount * 100);
      
      console.log('Parsed payment amount (in cents):', this.amount);
    }
  }

  async initializeStripe() {
    // Initialize Stripe with your public key
    this.stripe = await loadStripe('pk_test_51Ppsj2COFGM2o2umnB1vUdLcYQXkx6moY5sC0fNJPsDv9tXvgHKSPDXH6w6dX32gGle1GyjxfeDPxwkoqxpca7NK00GN3bIa3K');
    
    if (this.stripe) {
      const elements = this.stripe.elements();
      this.cardElement = elements.create('card');
      this.cardElement.mount('#card-element');
    }
  }

  async createPayment() {
    if (!this.stripe || !this.cardElement) {
      console.error('Stripe.js has not loaded properly.');
      return;
    }

    // Create a PaymentMethod
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement
    });

    if (error) {
      console.error('Error creating payment method:', error.message);
      return;
    }

    // Send the PaymentMethod ID and amount to your backend
    this.http.post<{ clientSecret: string }>('http://localhost:8088/api/v1/payment/create-payment-intent', {
      amount: this.amount, // Include the amount here
      paymentMethodId: paymentMethod.id // Include the payment method ID here
    })
    .subscribe(
      response => {
        this.clientSecret = response.clientSecret;
        this.confirmCardPayment(paymentMethod.id); // Pass the payment method ID here
      },
      error => console.error('Error creating payment intent:', error)
    );
  }

  async confirmCardPayment(paymentMethodId: string) {
    if (!this.stripe || !this.clientSecret) {
      console.error('Stripe.js has not loaded properly or clientSecret is missing.');
      return;
    }

    // Confirm the payment with the client secret and payment method ID
    const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: paymentMethodId
    });

    if (error) {
      console.error('Payment confirmation error:', error.message);
      alert('Payment failed: ' + error.message);
    } else if (paymentIntent?.status === 'succeeded') {
      console.log('Payment successful!');
      alert('Payment successful!');
      this.storedAmount = 0 ;
      this.userService.deleteCart( {userId : this.numericUserId}).subscribe(
        () => {
          console.log('Cart deleted successfully!');
          // You might want to refresh the cart list or navigate away
        },
        error => {
          console.error('Error deleting cart:', error);
          // Handle error, e.g., show a message to the user
        }
      );
      
      this.router.navigate(['']);
      // Optionally, redirect to a success page or update the UI
    } else {
      console.error('Unexpected payment status:', paymentIntent?.status);
      alert('Payment status: ' + paymentIntent?.status);
    }
  }
}
