import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { BodegaComponent } from './components/bodega/bodega.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ShoesComponent } from './components/shoes/shoes.component';
import { ProductsComponent } from './components/products/products.component';
import { VentasInfoComponent } from './components/ventas-info/ventas-info.component';
import { authGuard } from './services/auth.guard';

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
  { path: 'ventas', component: VentasInfoComponent, canActivate: [authGuard] },
  { path: 'bodega', component: BodegaComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
