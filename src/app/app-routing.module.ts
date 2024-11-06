import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './components/catalogo components/carousel/carousel.component';
import { BodegaComponent } from './components/admin components/bodega components/bodega/bodega.component';
import { authGuard } from './services/auth.guard';
import { LoginComponent } from './components/catalogo components/login/login.component';
import { AdminHomeComponent } from './components/admin components/admin-home/admin-home.component';
import { ShoesComponent } from './components/catalogo components/shoes/shoes.component';
import { VentasInfoComponent } from './components/admin components/ventas components/ventas-info/ventas-info.component';
import { ProductsComponent } from './components/catalogo components/products/products.component';
import { TotalSalesComponent } from './components/admin components/ventas components/total-sales/total-sales.component';
import { ProveedoresComponent } from './components/admin components/proveedores components/proveedores/proveedores.component';

const routes: Routes = [
  { path: 'home', component: CarouselComponent },
  { path: 'shoesImages', component: ShoesComponent },
  { path: 'allReferences', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'adminHome',
    component: AdminHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'ventaxmes',
    component: TotalSalesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'ventas',
    component: VentasInfoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent,
    canActivate: [authGuard],
  },
  { path: 'bodega', component: BodegaComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
