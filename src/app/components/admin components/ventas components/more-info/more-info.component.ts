import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrl: './more-info.component.css',
})
export class MoreInfoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  getTotalCantidad(): number {
    return this.data.tallasVendidas
      ? this.data.tallasVendidas.reduce((acc, item) => acc + item.cantidad, 0)
      : 0;
  }

  getCantidadPorTalla(talla: number): number {
    const tallaEncontrada = this.data.tallasVendidas?.find(
      (t) => t.talla === talla
    );
    return tallaEncontrada ? tallaEncontrada.cantidad : 0;
  }
}
