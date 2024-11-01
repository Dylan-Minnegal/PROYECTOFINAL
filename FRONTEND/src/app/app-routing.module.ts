import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component'; 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component'; 
import { AdminGuard } from './admin.guard';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component'; 
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'producto/:id', component: ProductDetailComponent } ,
  { path: 'login', component: LoginComponent } ,
  { path: 'register', component: RegisterComponent } ,
  { path: 'cart', component: CartComponent } ,
  { path: 'admin', component: PanelAdminComponent, canActivate: [AdminGuard] }, 
  { path: 'actualizar-producto/:id', component: ActualizarProductoComponent, canActivate: [AdminGuard] },
  { path: 'perfil', component: PerfilComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
