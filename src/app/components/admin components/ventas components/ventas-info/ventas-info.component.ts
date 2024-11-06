import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminInfoService } from '../../../../services/admin-info.service';
import { MoreInfoComponent } from '../more-info/more-info.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-ventas-info',
  templateUrl: './ventas-info.component.html',
  styleUrls: ['./ventas-info.component.css'],
})
export class VentasInfoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'fecha',
    'cantidad',
    'referencia',
    'precio',
    'cliente',
    'formaPago',
    'actions',
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  filterForm: FormGroup;
  showFilter: boolean = false;
  loading: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private adminInfoService: AdminInfoService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.filterForm = this.fb.group({
      saleId: [''],
      fecha: [null],
      formaPago: [''],
      cliente: [''],
      referencia: [''],
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  async ngOnInit() {
    this.loading = true;
    try {
      const sales = await this.adminInfoService.getSales();
      this.dataSource = new MatTableDataSource<any>(
        sales.map((sale) => ({
          ...sale,
          saleId: Number(sale.saleId),
          fecha: this.convertTimestampToDate(sale.fecha),
        }))
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (error) {
      console.error('Error al cargar las ventas:', error);
    } finally {
      this.loading = false;
    }
  }

  ngAfterViewInit() {
    this.sort.active = 'saleId';
    this.sort.direction = 'desc';
    this.dataSource.sort = this.sort;
  }
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  applyFilter() {
    if (this.dataSource) {
      const filterValues = {
        fecha: this.filterForm.get('fecha')?.value || '',
        formaPago: this.filterForm.get('formaPago')?.value || '',
        cliente: this.filterForm.get('cliente')?.value?.toLowerCase() || '',
        referencia:
          this.filterForm.get('referencia')?.value?.toLowerCase() || '',
      };
      this.dataSource.filter = JSON.stringify(filterValues);
    }
  }

  clearFilter() {
    this.filterForm.reset();
    this.applyFilter();
  }

  totalTallasVendidas(tallasVendidas: any): number {
    return tallasVendidas.reduce(
      (total: number, talla: any) => total + talla.cantidad,
      0
    );
  }

  onViewSale(sale: any) {
    this.dialog.open(MoreInfoComponent, {
      data: sale,
      width: '80vw',
      maxHeight: '80vh',
    });
  }

  convertTimestampToDate(timestamp: any): Date {
    if (timestamp && typeof timestamp.toDate === 'function') {
      return timestamp.toDate();
    }
    return new Date(timestamp);
  }
}
