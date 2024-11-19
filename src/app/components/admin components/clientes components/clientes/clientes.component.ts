import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminInfoService } from '../../../../services/admin-info.service';
import { ModalNewClienteComponent } from '../modales/modal-new-cliente/modal-new-cliente.component';
import { ClienteAccountComponent } from '../cliente-account/cliente-account.component';
import { CuentasPorCobrarComponent } from '../modales/cuentas-por-cobrar/cuentas-por-cobrar.component';
import { proveedor } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: proveedor[] = [];
  filteredClientes: proveedor[] = [];
  searchTerm: string = '';
  loading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private adminInfoService: AdminInfoService
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  async loadClientes(): Promise<void> {
    this.loading = true;
    this.clientes = await this.adminInfoService.getClientes();
    this.filteredClientes = this.clientes;
    this.loading = false;
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalNewClienteComponent);

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.adminInfoService.addNewCliente(result);
        await this.loadClientes();
        this.filterClientes();
      }
    });
  }

  openCuentaModal(cliente: proveedor): void {
    this.dialog.open(ClienteAccountComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '90vw',
      minHeight: '80vh',
      maxHeight: '90vh',
      data: { nombre: cliente.nombre },
    });
  }

  filterClientes(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredClientes = this.clientes;
    } else {
      const lowerSearchTerm = this.searchTerm.toLowerCase();
      this.filteredClientes = this.clientes.filter((cliente) =>
        cliente.nombre.toLowerCase().includes(lowerSearchTerm)
      );
    }
  }

  openCuentasPorPagarModal(): void {
    const dialogRef = this.dialog.open(CuentasPorCobrarComponent, {
      width: 'auto',
      minWidth: '90vw',
      height: 'auto',
      minHeight: '50vh',
      maxHeight: '90vh',
    });
  }
}
