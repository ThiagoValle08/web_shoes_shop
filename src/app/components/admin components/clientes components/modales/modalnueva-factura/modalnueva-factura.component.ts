import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { factura } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-modalnueva-factura',
  templateUrl: './modalnueva-factura.component.html',
  styleUrl: './modalnueva-factura.component.css',
})
export class ModalnuevaFacturaComponent {
  facturaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalnuevaFacturaComponent>
  ) {
    this.facturaForm = this.fb.group({
      fecha: [null, Validators.required],
      referencia: ['', Validators.required],
      valor: [, [Validators.required, Validators.min(1)]],
      numero: [''],
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
