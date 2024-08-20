import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService, UserService } from '../../../../services/services';
import { Item } from '../../../../services/models'; // Replace with actual model import
import { AddItemToCart$Params } from '../../../../services/fn/user/add-item-to-cart';
import { RemoveItemFromCart$Params } from '../../../../services/fn/user/remove-item-from-cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'] // Fixed 'styleUrl' to 'styleUrls'
})
export class CartComponent implements OnInit {

  product?: Item;
  productId?: string;
  quantity: number = 0;
  selectedQuantity: number = 1;
  userId?: string;
  loading: boolean = false;
  cartItems: any[] = []; // Replace 'any' with your actual item type
  totalAmount: number = 0;

  constructor(
    private userService: UserService,
    private publicService: PublicService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id ?? undefined;
    if (this.userId) {
      this.loadCartItems(parseInt(this.userId, 10));
    }
  }

  removeOne(productId: string) {
    this.updateProductQuantity(parseInt(productId, 10), -1);
  }

  addOne(productId: string) {
    this.updateProductQuantity(parseInt(productId, 10), 1);
  }

  private updateProductQuantity(productId: number, quantityChange: number): void {
    this.publicService.getItemById2({ id: productId }).subscribe({
      next: (product) => {
        this.product = product;
        this.quantity = product.quantity ?? 0;
        this.addToCart(productId, quantityChange);
      },
      error: (error) => {
        console.error('Error fetching product details', error);
      }
    });
  }    

  removeItem(cartItem_ID: number) {
    if (this.userId && cartItem_ID) {
      const userId = parseInt(this.userId, 10);
      const params: RemoveItemFromCart$Params = {
        CartItem_id: cartItem_ID
      };
      
      this.userService.removeItemFromCart(params).subscribe({
        next: (response) => {
          console.log("Item removed successfully!", response);
          
          this.loadCartItems(userId);
  
          // Reload the page after a successful item removal
          window.location.reload();
        },
        error: (error) => {
          console.error('Error removing product from cart', error);
        }
      });
    }
  }
  

    
  addToCart(productId: number | undefined, selectedQuantity: number): void {
    if (this.userId && this.product?.quantity) {
      const userId = parseInt(this.userId, 10);
      if (selectedQuantity > this.product.quantity) {
        alert('Quantity exceeds available stock.');
        return;
      }

      const params: AddItemToCart$Params = {
        userId: userId,
        body: { itemId: productId, quantity: selectedQuantity }
      };

      this.loading = true;
      this.userService.addItemToCart$Response(params).subscribe({
        next: () => {
          // alert('Product added to cart successfully.');
          this.loadCartItems(userId);
        },
        error: (error) => {
          console.error('Error adding product to cart', error);
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  loadCartItems(id: number): void {
    this.loading = true;
    this.userService.getCart({ UserId: id }).subscribe(response => {
      const cartResponse = response as { items: any[] }; // Adjust based on actual response type

      this.cartItems = cartResponse?.items ?? [];
      this.calculateTotal();
    }, error => {
      console.error('Error loading cart items', error);
    }, () => {
      this.loading = false;
    });
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((sum, cartItem) =>
      sum + (cartItem.item?.price || 0) * cartItem.quantity, 0);
  }

  checkout(): void {
    if (this.userId) {
      this.router.navigate(['dashboard', 'checkout', this.userId]);
    }
  }
}
