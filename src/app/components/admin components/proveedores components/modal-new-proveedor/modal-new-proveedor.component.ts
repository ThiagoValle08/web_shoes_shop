import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-new-proveedor',
  templateUrl: './modal-new-proveedor.component.html',
  styleUrl: './modal-new-proveedor.component.css',
})
export class ModalNewProveedorComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalNewProveedorComponent>
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      Swal.fire({
        title: 'Guardado',
        text: 'Se ha guardado el nuevo proveedor.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      this.dialogRef.close(this.form.value);
    }
  }
}
