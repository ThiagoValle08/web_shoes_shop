import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/catalogo components/carousel/carousel.component';
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
import { ShoesComponent } from './components/catalogo components/shoes/shoes.component';
import { ProductsComponent } from './components/catalogo components/products/products.component';
import { LoginComponent } from './components/catalogo components/login/login.component';
import { TotalSalesComponent } from './components/admin components/ventas components/total-sales/total-sales.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    ShoesComponent,
    ProductsComponent,
    LoginComponent,
    VentasComponent,
    AddNumberingComponent,
    NewReferenceComponent,
    AdminHomeComponent,
    BodegaComponent,
    MoreInfoComponent,
    VentasInfoComponent,
    TotalSalesComponent,
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatListModule,
    MatStepperModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule,
    AppRoutingModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonToggleModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDatepickerModule,
    NgxChartsModule,
    BrowserAnimationsModule,
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
