import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { factura } from '../../../../interfaces/interfaces';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-nueva-factura',
  templateUrl: './modal-nueva-factura.component.html',
  styleUrls: ['./modal-nueva-factura.component.css'],
})
export class ModalNuevaFacturaComponent {
  facturaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalNuevaFacturaComponent>
  ) {
    this.facturaForm = this.fb.group({
      fecha: [null, Validators.required],
      referencia: ['', Validators.required],
      valor: [, [Validators.required, Validators.min(1)]],
      numero: [''], // Agrega el control 'numero' aquí
    });
  }

  onSubmit(): void {
    if (this.facturaForm.valid) {
      const nuevaFactura: factura = {
        ...this.facturaForm.value,
        fecha: this.facturaForm.value.fecha.toISOString().split('T')[0],
        deuda: this.facturaForm.value.valor,
      };

      Swal.fire({
        title: 'Guardado',
        text: 'La factura se ha agregado correctamente.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        this.dialogRef.close(nuevaFactura);
      });
    } else {
      this.showValidationErrors();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  showValidationErrors(): void {
    if (this.facturaForm.get('fecha')?.hasError('required')) {
      Swal.fire({
        title: 'Campo Obligatorio',
        text: 'Por favor, selecciona una fecha.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else if (this.facturaForm.get('referencia')?.hasError('required')) {
      Swal.fire({
        title: 'Campo Obligatorio',
        text: 'Por favor, ingresa una referencia.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else if (
      this.facturaForm.get('valor')?.hasError('required') ||
      this.facturaForm.get('valor')?.hasError('min')
    ) {
      Swal.fire({
        title: 'Valor Incorrecto',
        text: 'El valor es obligatorio y debe ser mayor a 0.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
}
