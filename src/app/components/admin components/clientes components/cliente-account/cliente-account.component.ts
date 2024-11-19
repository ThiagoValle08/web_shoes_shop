import { Component, Inject, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { factura, proveedor } from '../../../../interfaces/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminInfoService } from '../../../../services/admin-info.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ModalnuevaFacturaComponent } from '../modales/modalnueva-factura/modalnueva-factura.component';
import { ModalAddAbonoClienteComponent } from '../modales/modal-add-abono-cliente/modal-add-abono-cliente.component';
import { ModalMostrarAbonosComponent } from '../modales/modal-mostrar-abonos/modal-mostrar-abonos.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cliente-account',
  templateUrl: './cliente-account.component.html',
  styleUrl: './cliente-account.component.css',
})
export class ClienteAccountComponent {
  cliente: proveedor | undefined;
  dataSource: MatTableDataSource<factura> = new MatTableDataSource();
  totalDeuda: number = 0;

  displayedColumns: string[] = [
    'numeroId',
    'estado',
    'fecha',
    'numero',
    'referencia',
    'valor',
    'deuda',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private adminInfoService: AdminInfoService,
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string },
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCliente();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  loadCliente(): void {
    this.cliente = this.adminInfoService.getClienteByName(this.data.nombre);

    if (this.cliente && this.cliente.facturas) {
      const facturas = this.cliente.facturas.map((factura) => {
        factura.estado = factura.deuda <= 0;
        return factura;
      });

      this.dataSource.data = facturas.reverse();
    } else {
      this.dataSource.data = [];
    }

    this.calcularTotalDeuda();
  }


  calcularTotalDeuda(): void {
    this.totalDeuda = this.dataSource.data.reduce(
      (acc, factura) => acc + factura.deuda,
      0
    );
  }

  openNuevaFacturaModal(): void {
    const dialogRef = this.dialog.open(ModalnuevaFacturaComponent, {
      width: '90vw',
      height: 'auto',
      maxHeight: '80vh',
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe((result: factura) => {
      if (result) {
        this.adminInfoService
          .agregarFacturaACliente(this.data.nombre, result)
          .then(() => {
            this.loadCliente();
          });
      }
    });
  }

  openAddAbonoModal(numeroFactura: number): void {
    const facturaActual = this.cliente?.facturas.find(
      (f) => f.numeroId === numeroFactura
    );
    const totalAbonos =
      facturaActual?.abono?.reduce((acc, curr) => acc + curr.cantidad, 0) || 0;

    const dialogRef = this.dialog.open(ModalAddAbonoClienteComponent, {
      width: 'auto',
      height: 'auto',
      maxHeight: '80vh',
      data: { nombreProveedor: this.cliente?.nombre, numeroFactura },
    });

    dialogRef.afterClosed().subscribe((nuevoAbono) => {
      if (nuevoAbono && this.cliente) {
        const nuevoTotalAbonos = totalAbonos + nuevoAbono.cantidad;

        if (nuevoTotalAbonos > (facturaActual?.valor || 0)) {
          Swal.fire({
            title: 'Error',
            text: 'La suma de los abonos no puede exceder el valor de la factura.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          this.adminInfoService.agregarAbonoClienteFactura(
            this.cliente.nombre,
            numeroFactura,
            nuevoAbono
          );
          this.loadCliente();
          Swal.fire({
            title: 'Guardado',
            text: 'El abono se ha agregado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          const deudaActualizada = this.cliente.facturas.find(
            (f) => f.numeroId === numeroFactura
          )?.deuda;

          if (deudaActualizada === 0) {
            Swal.fire({
              title: 'Deuda Cancelada',
              text: 'La deuda de esta factura ha sido cancelada por completo.',
              icon: 'info',
              confirmButtonText: 'OK',
            });
          }
        }
      }
    });
  }

  openShowAbonosModal(numeroFactura: number): void {
    const factura = this.dataSource.data.find(
      (f) => f.numeroId === numeroFactura
    );
    const dialogRef = this.dialog.open(ModalMostrarAbonosComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '80vw',
      maxWidth: '100vw',
      maxHeight: '80vh',
      data: { abonos: factura?.abono },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
