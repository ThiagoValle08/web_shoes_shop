import { Component } from '@angular/core';
import { AdminInfoService } from '../../../../../services/admin-info.service';
import { proveedor } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-cuentas-por-cobrar',
  templateUrl: './cuentas-por-cobrar.component.html',
  styleUrl: './cuentas-por-cobrar.component.css',
})
export class CuentasPorCobrarComponent {
  ClientesDeuda: { nombre: string; totalDeuda: number }[] = [];
  totalDeuda: number = 0;
  loader: boolean = true;

  constructor(private adminInfoService: AdminInfoService) {}

  ngOnInit(): void {
    this.calcularDeudas();
  }

  async calcularDeudas(): Promise<void> {
    try {
      const proveedores = await this.adminInfoService.getClientes();
      this.ClientesDeuda = proveedores
        .map((cliente: proveedor) => {
          const totalDeuda =
            cliente.facturas?.reduce(
              (acc, factura) => acc + factura.deuda,
              0
            ) || 0;
          return { nombre: cliente.nombre, totalDeuda };
        })
        .filter((cliente) => cliente.totalDeuda > 0);

      this.totalDeuda = this.ClientesDeuda.reduce(
        (acc, proveedor) => acc + proveedor.totalDeuda,
        0
      );
    } finally {
      this.loader = false;
    }
  }
}
