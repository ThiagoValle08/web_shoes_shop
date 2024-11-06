import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewProveedorComponent } from '../modal-new-proveedor/modal-new-proveedor.component';
import { ProovedorAccountComponent } from '../proovedor-account/proovedor-account.component';
import { proveedor } from '../../../../interfaces/interfaces';
import { AdminInfoService } from '../../../../services/admin-info.service';
import { ModalCuentasPorPagarComponent } from './modal-cuentas-por-pagar/modal-cuentas-por-pagar.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
})
export class ProveedoresComponent implements OnInit {
  proveedores: proveedor[] = [];
  filteredProveedores: proveedor[] = [];
  searchTerm: string = '';
  loading: boolean = true; // Variable para controlar el estado del loader

  constructor(
    public dialog: MatDialog,
    private adminInfoService: AdminInfoService
  ) {}

  ngOnInit(): void {
    this.loadProveedores();
  }

  async loadProveedores(): Promise<void> {
    this.loading = true; // Iniciar el loader
    this.proveedores = await this.adminInfoService.getProveedores(); // Obtener proveedores
    this.filteredProveedores = this.proveedores; // Asignar a filteredProveedores
    this.loading = false; // Detener el loader
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalNewProveedorComponent);

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.adminInfoService.addNewProveedor(result);
        await this.loadProveedores(); // Volver a cargar proveedores
        this.filterProveedores();
      }
    });
  }

  openCuentaModal(proveedor: proveedor): void {
    this.dialog.open(ProovedorAccountComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '90vw',
      minHeight: '80vh',
      maxHeight: '90vh',
      data: { nombre: proveedor.nombre },
    });
  }

  filterProveedores(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredProveedores = this.proveedores;
    } else {
      const lowerSearchTerm = this.searchTerm.toLowerCase();
      this.filteredProveedores = this.proveedores.filter((proveedor) =>
        proveedor.nombre.toLowerCase().includes(lowerSearchTerm)
      );
    }
  }

  openCuentasPorPagarModal(): void {
    const dialogRef = this.dialog.open(ModalCuentasPorPagarComponent, {
      width: 'auto',
      minWidth: '90vw',
      height: 'auto',
      minHeight: '50vh',
      maxHeight: '90vh',
    });
  }
}
