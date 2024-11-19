import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodegaComponent } from './components/admin components/bodega components/bodega/bodega.component';
import { authGuard } from './services/auth.guard';
import { LoginComponent } from './components/catalogo components/login/login.component';
import { VentasInfoComponent } from './components/admin components/ventas components/ventas-info/ventas-info.component';
import { TotalSalesComponent } from './components/admin components/ventas components/total-sales/total-sales.component';
import { ProveedoresComponent } from './components/admin components/proveedores components/proveedores/proveedores.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { WelcomeComponentComponent } from './core/components/pages/welcome-component/welcome-component.component';
import { ClientesComponent } from './components/admin components/clientes components/clientes/clientes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'adminHome',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: WelcomeComponentComponent,
      },
      {
        path: 'bodega',
        component: BodegaComponent,
      },
      {
        path: 'ventas',
        component: VentasInfoComponent,
      },
      {
        path: 'totalVentas',
        component: TotalSalesComponent,
      },
      {
        path: 'proveedores',
        component: ProveedoresComponent,
      },
      {
        path: 'clientes',
        component: ClientesComponent,
      },
    ],
    canActivate: [authGuard],
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
