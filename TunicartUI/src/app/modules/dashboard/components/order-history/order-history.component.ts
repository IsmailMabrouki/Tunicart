import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../../services/models';
import { UserService } from '../../../../services/services';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'] // fixed 'styleUrl' typo
})
export class OrderHistoryComponent implements OnInit {
  currentPage = 1;
  pageSize = 8;
  totalOrders = 0;
  paginatedOrders: PurchaseOrder[] = [];

  orders: PurchaseOrder[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Retrieve the user ID from local storage
    const userIdString = localStorage.getItem('id');

    // Convert the user ID from string to number
    const userId = userIdString ? +userIdString : null; // Get this dynamically from the logged-in user
    if(userId){
    this.userService.getOrderHistory({ userId: userId }).subscribe(
      (response: any) => {
        this.orders = response as PurchaseOrder[]; // Directly assign the response to orders
        this.orders.reverse(); // Reverse the order array
        this.totalOrders = this.orders.length;
        this.updatePaginatedOrders();
        console.log("PurchaseOrder history: ", this.orders);
      },
      (error) => {
        console.error('Failed to load order history', error);
      }
    );
   }
  }

  updatePaginatedOrders(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedOrders = this.orders.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages()) {
      this.currentPage = page;
      this.updatePaginatedOrders();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalOrders / this.pageSize);
  }
}
