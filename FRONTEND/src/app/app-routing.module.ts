import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component'; 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';



const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'producto/:id', component: ProductDetailComponent } ,
  { path: 'login', component: LoginComponent } ,
  { path: 'register', component: RegisterComponent } ,
  { path: 'cart', component: CartComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
