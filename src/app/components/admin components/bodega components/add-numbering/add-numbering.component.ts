import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Referencia } from '../../../../interfaces/interfaces';
import { AdminInfoService } from '../../../../services/admin-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-numbering',
  templateUrl: './add-numbering.component.html',
  styleUrls: ['./add-numbering.component.css'],
})
export class AddNumberingComponent {
  reference: Referencia;
  tallas = [35, 36, 37, 38, 39, 40, 41, 42, 43];
  cantidades: { [key: number]: number } = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reference: Referencia },
    private adminInfoService: AdminInfoService,
    private dialogRef: MatDialogRef<AddNumberingComponent>
  ) {
    this.reference = data.reference;
    this.tallas.forEach((talla) => (this.cantidades[talla] = 0));
  }

  cancelar() {
    this.cantidades = {};
    this.dialogRef.close();
  }

  guardar() {
    for (const talla of this.tallas) {
      this.reference.tallas[talla] += this.cantidades[talla];
    }

    this.reference.totalCantidad = Object.values(this.reference.tallas).reduce(
      (acc, val) => acc + val,
      0
    );

    this.adminInfoService.updateReference(this.reference);
    Swal.fire({
      title: 'Guardado',
      text: 'Se ha actualizado la cantidad de tallas.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    this.dialogRef.close();
  }
}
