import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module'

import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './pages/main/main.component';
import { SellerProductsComponent } from './components/seller-products/seller-products.component';
import { SellerMenuComponent } from './components/seller-menu/seller-menu.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerDashoardComponent } from './components/seller-dashoard/seller-dashoard.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { StatsComponent } from './components/stats/stats.component';
import { NgChartsModule } from 'ng2-charts';
import { ActivityHistoryComponent } from './components/activity-history/activity-history.component';


@NgModule({
  declarations: [
    MainComponent,
    SellerProductsComponent,
    SellerMenuComponent,
    AddItemComponent,
    SellerDashoardComponent,
    CartComponent,
    CheckoutComponent,
    PaymentComponent,
    OrderHistoryComponent,
    StatsComponent,
    ActivityHistoryComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
    NgChartsModule,
    
]
})
export class DashboardModule { }
