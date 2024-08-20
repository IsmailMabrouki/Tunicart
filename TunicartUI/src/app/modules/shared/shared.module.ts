import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ProductCardComponent,
    ProfileComponent,
    UpdateProfileComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],

  exports: [
    NavbarComponent,
    FooterComponent,
    ProductCardComponent,
    ProfileComponent,
  ],
})
export class SharedModule {}
