import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { BodegaComponent } from './components/admin components/bodega components/bodega/bodega.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { GlobalErrorHandler } from './error';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MoreInfoComponent } from './components/admin components/ventas components/more-info/more-info.component';
import { HttpClientModule } from '@angular/common/http';
import { VentasComponent } from './components/admin components/bodega components/ventas/ventas.component';
import { NewReferenceComponent } from './components/admin components/bodega components/new-reference/new-reference.component';
import { AdminHomeComponent } from './components/admin components/admin-home/admin-home.component';
import { AddNumberingComponent } from './components/admin components/bodega components/add-numbering/add-numbering.component';
import { VentasInfoComponent } from './components/admin components/ventas components/ventas-info/ventas-info.component';
import { LoginComponent } from './components/catalogo components/login/login.component';
import { TotalSalesComponent } from './components/admin components/ventas components/total-sales/total-sales.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProveedoresComponent } from './components/admin components/proveedores components/proveedores/proveedores.component';
import { ModalNewProveedorComponent } from './components/admin components/proveedores components/modal-new-proveedor/modal-new-proveedor.component';
import { ProovedorAccountComponent } from './components/admin components/proveedores components/proovedor-account/proovedor-account.component';
import { ModalNuevaFacturaComponent } from './components/admin components/proveedores components/modal-nueva-factura/modal-nueva-factura.component';
import { ModalAddAbonoComponent } from './components/admin components/proveedores components/proovedor-account/modal-add-abono/modal-add-abono.component';
import { ShowAbonosComponent } from './components/admin components/proveedores components/proovedor-account/show-abonos/show-abonos.component';
import { ModalCuentasPorPagarComponent } from './components/admin components/proveedores components/proveedores/modal-cuentas-por-pagar/modal-cuentas-por-pagar.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { WelcomeComponentComponent } from './core/components/pages/welcome-component/welcome-component.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message'; // Para mostrar alertas
import { AppConfigModule } from './layout/config/config.module';
import { ClientesComponent } from './components/admin components/clientes components/clientes/clientes.component';
import { ModalNewClienteComponent } from './components/admin components/clientes components/modales/modal-new-cliente/modal-new-cliente.component';
import { ClienteAccountComponent } from './components/admin components/clientes components/cliente-account/cliente-account.component';
import { CuentasPorCobrarComponent } from './components/admin components/clientes components/modales/cuentas-por-cobrar/cuentas-por-cobrar.component';
import { ModalnuevaFacturaComponent } from './components/admin components/clientes components/modales/modalnueva-factura/modalnueva-factura.component';
import { ModalAddAbonoClienteComponent } from './components/admin components/clientes components/modales/modal-add-abono-cliente/modal-add-abono-cliente.component';
import { ModalMostrarAbonosComponent } from './components/admin components/clientes components/modales/modal-mostrar-abonos/modal-mostrar-abonos.component';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VentasComponent,
    AddNumberingComponent,
    NewReferenceComponent,
    AdminHomeComponent,
    BodegaComponent,
    MoreInfoComponent,
    VentasInfoComponent,
    TotalSalesComponent,
    ProveedoresComponent,
    ModalNewProveedorComponent,
    ProovedorAccountComponent,
    ModalNuevaFacturaComponent,
    ModalAddAbonoComponent,
    ShowAbonosComponent,
    ModalCuentasPorPagarComponent,
    WelcomeComponentComponent,
    ClientesComponent,
    ModalNewClienteComponent,
    ClienteAccountComponent,
    CuentasPorCobrarComponent,
    ModalnuevaFacturaComponent,
    ModalAddAbonoClienteComponent,
    ModalMostrarAbonosComponent,
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    ProgressSpinnerModule,
    ChartModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatStepperModule,
    MatTableModule,
    MatCardModule,
    MessageModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule,
    CardModule,
    AppRoutingModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSortModule,
    MatButtonToggleModule,
    AppConfigModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDatepickerModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    AppLayoutModule,
    ButtonModule,
    FormsModule,
    SidebarModule,
    RadioButtonModule,
    ButtonModule,
    InputSwitchModule,
    InputTextModule,
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
