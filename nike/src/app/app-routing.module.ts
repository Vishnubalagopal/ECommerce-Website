import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsRoutingModule } from './products/products-routing.module';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
 
  {
    path:'', component:LoginComponent
  },
  {
    path:'register', component:RegisterComponent
  },

  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  {
    path:"**",component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),ProductsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
