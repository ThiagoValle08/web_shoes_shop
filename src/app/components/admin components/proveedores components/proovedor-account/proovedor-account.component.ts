import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { factura, proveedor } from '../../../../interfaces/interfaces';
import { AdminInfoService } from '../../../../services/admin-info.service';
import { ModalNuevaFacturaComponent } from '../modal-nueva-factura/modal-nueva-factura.component';
import { MatTableDataSource } from '@angular/material/table';
import { ModalAddAbonoComponent } from './modal-add-abono/modal-add-abono.component';
import { ShowAbonosComponent } from './show-abonos/show-abonos.component';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-proovedor-account',
  templateUrl: './proovedor-account.component.html',
  styleUrls: ['./proovedor-account.component.css'],
})
export class ProovedorAccountComponent implements AfterViewInit {
  proveedor: proveedor | undefined;
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

  constructor(
    private adminInfoService: AdminInfoService,
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string },
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProveedor();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadProveedor(): void {
    this.proveedor = this.adminInfoService.getProveedorByName(this.data.nombre);

    if (this.proveedor && this.proveedor.facturas) {
      this.dataSource.data = this.proveedor.facturas.map((factura) => {
        factura.estado = factura.deuda <= 0;
        return factura;
      });
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
    const dialogRef = this.dialog.open(ModalNuevaFacturaComponent, {
      width: '90vw',
      height: 'auto',
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe((result: factura) => {
      if (result) {
        this.adminInfoService
          .agregarFacturaAProveedor(this.data.nombre, result)
          .then(() => {
            this.loadProveedor();
          });
      }
    });
  }

  openAddAbonoModal(numeroFactura: number): void {
    const facturaActual = this.proveedor?.facturas.find(
      (f) => f.numeroId === numeroFactura
    );
    const totalAbonos =
      facturaActual?.abono?.reduce((acc, curr) => acc + curr.cantidad, 0) || 0;

    const dialogRef = this.dialog.open(ModalAddAbonoComponent, {
      width: 'auto',
      height: 'auto',
      data: { nombreProveedor: this.proveedor?.nombre, numeroFactura },
    });

    dialogRef.afterClosed().subscribe((nuevoAbono) => {
      if (nuevoAbono && this.proveedor) {
        const nuevoTotalAbonos = totalAbonos + nuevoAbono.cantidad;

        if (nuevoTotalAbonos > (facturaActual?.valor || 0)) {
          Swal.fire({
            title: 'Error',
            text: 'La suma de los abonos no puede exceder el valor de la factura.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          this.adminInfoService.agregarAbonoAFactura(
            this.proveedor.nombre,
            numeroFactura,
            nuevoAbono
          );
          this.loadProveedor();

          Swal.fire({
            title: 'Guardado',
            text: 'El abono se ha agregado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          const deudaActualizada = this.proveedor.facturas.find(
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
    const dialogRef = this.dialog.open(ShowAbonosComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '80vw',
      maxWidth: '100vw',
      maxHeight: '90vh',
      data: { abonos: factura?.abono },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
