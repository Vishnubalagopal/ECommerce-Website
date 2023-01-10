import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { PdetailsComponent } from './pdetails/pdetails.component';
import { ProductsComponent } from './products.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path:'allproducts',component:AllProductsComponent},
  { path:'cart',component:CartComponent},
{ path:'checkout',component:CheckoutComponent},
{ path:'pdetails/:id',component:PdetailsComponent},
{ path:'wishlist',component:WishlistComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
