import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { CodeInputModule } from 'angular-code-input';
import { HomeComponent } from './pages/home/home.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { BestSellersComponent } from './components/best-sellers/best-sellers.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';

import { ReviewsComponent } from './components/reviews/reviews.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { SharedModule } from './modules/shared/shared.module';
import { HttpTokenInterceptor } from './services/interceptor/http-token.interceptor';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AboutComponent } from './components/about/about.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    HomeComponent,
    FeaturedProductsComponent,
    BestSellersComponent,
    NewArrivalsComponent,
    ReviewsComponent,
    UserCardComponent,
    ProductsListComponent,
    AboutComponent,
    ProductDetailsComponent,
    UpdateProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CodeInputModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
