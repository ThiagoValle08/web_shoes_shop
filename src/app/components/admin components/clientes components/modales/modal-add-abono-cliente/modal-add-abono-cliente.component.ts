import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { abono } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-modal-add-abono-cliente',
  templateUrl: './modal-add-abono-cliente.component.html',
  styleUrl: './modal-add-abono-cliente.component.css',
})
export class ModalAddAbonoClienteComponent {
  abonoForm: FormGroup;

  constructor(
    private fb: FormBuilder,

    private MatDialogRef: MatDialogRef<ModalAddAbonoClienteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { nombreCliente: string; numeroFactura: number }
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

      this.MatDialogRef.close(nuevoAbono);
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
