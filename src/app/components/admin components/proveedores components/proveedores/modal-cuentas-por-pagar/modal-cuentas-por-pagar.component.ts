import { Component, Inject } from '@angular/core';
import { AdminInfoService } from '../../../../../services/admin-info.service';
import { proveedor } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-modal-cuentas-por-pagar',
  templateUrl: './modal-cuentas-por-pagar.component.html',
  styleUrl: './modal-cuentas-por-pagar.component.css',
})
export class ModalCuentasPorPagarComponent {
  proveedoresDeuda: { nombre: string; totalDeuda: number }[] = [];
  totalDeuda: number = 0;
  loader: boolean = true;

  constructor(private adminInfoService: AdminInfoService) {}

  ngOnInit(): void {
    this.calcularDeudas();
  }

  async calcularDeudas(): Promise<void> {
    try {
      const proveedores = await this.adminInfoService.getProveedores();
      this.proveedoresDeuda = proveedores
        .map((proveedor: proveedor) => {
          const totalDeuda =
            proveedor.facturas?.reduce(
              (acc, factura) => acc + factura.deuda,
              0
            ) || 0;
          return { nombre: proveedor.nombre, totalDeuda };
        })
        .filter((proveedor) => proveedor.totalDeuda > 0);

      this.totalDeuda = this.proveedoresDeuda.reduce(
        (acc, proveedor) => acc + proveedor.totalDeuda,
        0
      );
    } finally {
      this.loader = false; // Desactiva el loader después de cargar los datos
    }
  }
}
