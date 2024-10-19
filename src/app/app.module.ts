import { ErrorHandler, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { BodegaComponent } from './components/bodega/bodega.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewReferenceComponent } from './components/new-reference/new-reference.component';
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
import { GlobalErrorHandler } from './components/error';
import { AddNumberingComponent } from './components/add-numbering/add-numbering.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoesComponent } from './components/shoes/shoes.component';
import { VentasInfoComponent } from './components/ventas-info/ventas-info.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MoreInfoComponent } from './components/more-info/more-info.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    ShoesComponent,
    ProductsComponent,
    LoginComponent,
    AdminHomeComponent,
    BodegaComponent,
    VentasComponent,
    NewReferenceComponent,
    AddNumberingComponent,
    VentasInfoComponent,
    MoreInfoComponent,
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatListModule,
    MatStepperModule,
    MatTableModule,
    MatCardModule,
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
  ],
  exports: [RouterModule],

  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
