import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Referencia, Venta } from '../../../../interfaces/interfaces';
import { AdminInfoService } from '../../../../services/admin-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css',
})
export class VentasComponent {
  ventaForm: FormGroup;
  reference: Referencia;
  tallas = [35, 36, 37, 38, 39, 40, 41, 42, 43];
  fechaHoy: Date = new Date();
  totalCantidad = 0;
  ventas: Venta[] = [];

  constructor(
    private fb: FormBuilder,
    private adminInfoService: AdminInfoService,
    private dialogRef: MatDialogRef<VentasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reference: Referencia }
  ) {
    this.reference = data.reference;
  }

  ngOnInit(): void {
    this.ventaForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      formaPago: ['', Validators.required],
      valorPorPar: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      fecha: [{ value: this.fechaHoy, disabled: true }],
      referencia: [{ value: this.reference.nombreReferencia, disabled: true }],
      totalCantidad: [{ value: this.totalCantidad, disabled: true }],
      ...this.tallas.reduce((acc, talla) => {
        acc[talla] = [0, Validators.min(0)];
        return acc;
      }, {}),
    });

    this.ventaForm.valueChanges.subscribe((formValue) => {
      this.calcularCantidadTotal(formValue);
    });
  }

  calcularPrecioTotal() {
    const cantidad = this.ventaForm.get('totalCantidad')?.value || 0;
    const valorPorPar = this.ventaForm.get('valorPorPar')?.value || 0;
    const precioTotal = cantidad * valorPorPar;
    this.ventaForm.get('precio')?.setValue(precioTotal);
  }

  calcularCantidadTotal(formValue: any): void {
    const nuevaCantidadTotal = this.tallas.reduce((acc, talla) => {
      const cantidad = formValue[talla] || 0;
      return acc + cantidad;
    }, 0);

    if (nuevaCantidadTotal !== this.totalCantidad) {
      this.totalCantidad = nuevaCantidadTotal;
      this.ventaForm.patchValue(
        { totalCantidad: this.totalCantidad },
        { emitEvent: false }
      );
    }
  }

  onSubmit(): void {
    if (this.ventaForm.valid) {
      if (this.totalCantidad <= 0) {
        Swal.fire({
          title: 'Error',
          text: 'La cantidad total de zapatos debe ser mayor a 0 para registrar la venta.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }

      const formValue = this.ventaForm.value;
      let canProceed = true;
      const tallasAActualizar = {};

      this.tallas.forEach((talla) => {
        const cantidadVendida = formValue[talla] ? formValue[talla] : 0;

        if (this.reference.tallas[talla] !== undefined) {
          if (cantidadVendida > this.reference.tallas[talla]) {
            Swal.fire({
              title: 'Error',
              text: `La cantidad a vender para la talla ${talla} excede la cantidad disponible (${this.reference.tallas[talla]}).`,
              icon: 'error',
              confirmButtonText: 'OK',
            });
            canProceed = false;
          } else {
            if (cantidadVendida > 0) {
              tallasAActualizar[talla] = cantidadVendida;
            }
          }
        }
      });

      if (canProceed) {
        for (const talla in tallasAActualizar) {
          const cantidadVendida = tallasAActualizar[talla];
          this.reference.tallas[talla] -= cantidadVendida;

          if (this.reference.tallas[talla] < 0) {
            this.reference.tallas[talla] = 0;
          }
        }

        const totalCantidadActualizada = Object.values(
          this.reference.tallas
        ).reduce((acc, cantidad) => acc + cantidad, 0);
        this.reference.totalCantidad = totalCantidadActualizada;

        this.adminInfoService.updateReference(this.reference);

        const sale = {
          nombreCliente: formValue.nombreCliente,
          formaPago: formValue.formaPago,
          precio: formValue.precio,
          fecha: this.fechaHoy,
          referencia: this.reference.nombreReferencia,
          tallasVendidas: this.tallas
            .map((talla) => ({
              talla,
              cantidad: formValue[talla] || 0,
            }))
            .filter((t) => t.cantidad > 0),
        };

        this.adminInfoService.addSale(sale);

        Swal.fire({
          title: 'Guardado',
          text: 'La venta ha sido registrada exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        this.dialogRef.close();
      }
    }
  }
}
