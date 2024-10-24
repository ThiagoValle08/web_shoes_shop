import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AdminInfoService } from '../../../../services/admin-info.service';
import { MoreInfoComponent } from '../more-info/more-info.component';

@Component({
  selector: 'app-ventas-info',
  templateUrl: './ventas-info.component.html',
  styleUrls: ['./ventas-info.component.css'],
})
export class VentasInfoComponent {
  displayedColumns: string[] = [
    'fecha',
    'cantidad',
    'referencia',
    'precio',
    'cliente',
    'formaPago',
    'actions',
  ];

  dataSource: MatTableDataSource<any>;
  filterForm: FormGroup;
  showFilter = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private adminInfoService: AdminInfoService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<any>(
      this.adminInfoService.getSales()
    );

    this.filterForm = this.fb.group({
      fecha: [null],
      formaPago: [''],
      cliente: [''],
      referencia: [''],
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  ngOnInit() {
    this.dataSource.data = this.adminInfoService.getSales();
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filtros = JSON.parse(filter);

      const fechaFiltro = filtros.fecha
        ? formatDate(filtros.fecha, 'yyyy-MM-dd', 'en-US')
        : null;
      const fechaData = data.fecha
        ? formatDate(data.fecha, 'yyyy-MM-dd', 'en-US')
        : null;

      const fechaMatch =
        !fechaFiltro || (fechaData && fechaData === fechaFiltro);
      const formaPagoMatch =
        !filtros.formaPago ||
        (data.formaPago &&
          data.formaPago.toLowerCase() === filtros.formaPago.toLowerCase());
      const clienteMatch =
        !filtros.cliente ||
        (data.nombreCliente &&
          data.nombreCliente
            .toLowerCase()
            .includes(filtros.cliente.toLowerCase()));
      const referenciaMatch =
        !filtros.referencia ||
        (data.referencia &&
          data.referencia
            .toLowerCase()
            .includes(filtros.referencia.toLowerCase()));

      return fechaMatch && formaPagoMatch && clienteMatch && referenciaMatch;
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  applyFilter() {
    const filterValues = {
      fecha: this.filterForm.get('fecha')?.value || '',
      formaPago: this.filterForm.get('formaPago')?.value || '',
      cliente: this.filterForm.get('cliente')?.value?.toLowerCase() || '',
      referencia: this.filterForm.get('referencia')?.value?.toLowerCase() || '',
    };
    this.dataSource.filter = JSON.stringify(filterValues);
  }

  clearFilter() {
    this.filterForm.reset();
    this.dataSource.filter = '';
  }

  onViewSale(sale: any) {
    this.dialog.open(MoreInfoComponent, {
      width: '95vw',
      height: '90vh',
      maxWidth: 'none',
      data: sale,
    });
  }

  totalTallasVendidas(tallasVendidas: any[]): number {
    return tallasVendidas.reduce((acc, t) => acc + t.cantidad, 0);
  }
}
