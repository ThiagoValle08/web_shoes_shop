import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { abono } from '../../../../../interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-add-abono',
  templateUrl: './modal-add-abono.component.html',
  styleUrl: './modal-add-abono.component.css',
})
export class ModalAddAbonoComponent {
  abonoForm: FormGroup;

  constructor(
    private fb: FormBuilder,

    private dialogRef: MatDialogRef<ModalAddAbonoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { nombreProveedor: string; numeroFactura: number }
  ) {
    this.abonoForm = this.fb.group({
      fecha: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      nota: [''],
    });
  }

  guardarAbono(): void {
    if (this.abonoForm.valid) {
      const nuevoAbono: abono = {
        fecha: this.abonoForm.value.fecha,
        cantidad: this.abonoForm.value.cantidad,
        nota: this.abonoForm.value.nota,
      };

      this.dialogRef.close(nuevoAbono);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos obligatorios.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
}
