import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SellerProductsComponent } from './components/seller-products/seller-products.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { SellerDashoardComponent } from './components/seller-dashoard/seller-dashoard.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { UpdateProductComponent } from '../../components/update-product/update-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
    { 
      path: '',
      component: MainComponent,
      canActivate: [],
      children: [
        {
          path: '',
          component:  SellerDashoardComponent
        },
        {
          path: 'seller-products',
          component:  SellerProductsComponent
        },
        {
          path: 'item/:id',
          component:  AddItemComponent
        },
        {
          path: 'cart/:id',
          component:  CartComponent
        },
        {
          path: 'product-details/:id',
          component:  ProductDetailsComponent
        },
        {
          path: 'update-product/:id',
          component:  UpdateProductComponent
        },
        {
          path: 'checkout/:id',
          component:  CheckoutComponent
        },
        {
          path: 'payment/:id',
          component:  PaymentComponent
        }
      ]
    }
   
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
