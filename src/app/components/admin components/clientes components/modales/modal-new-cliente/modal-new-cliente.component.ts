import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-new-cliente',
  templateUrl: './modal-new-cliente.component.html',
  styleUrl: './modal-new-cliente.component.css',
})
export class ModalNewClienteComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalNewClienteComponent>
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      Swal.fire({
        title: 'Guardado',
        text: 'Se ha guardado el nuevo Cliente.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      this.dialogRef.close(this.form.value);
    }
  }
}
