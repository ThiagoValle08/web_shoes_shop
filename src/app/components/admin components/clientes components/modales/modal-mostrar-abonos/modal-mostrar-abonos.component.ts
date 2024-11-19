import { Component, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { abono } from '../../../../../interfaces/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-modal-mostrar-abonos',
  templateUrl: './modal-mostrar-abonos.component.html',
  styleUrl: './modal-mostrar-abonos.component.css',
})
export class ModalMostrarAbonosComponent {
  dataSource: MatTableDataSource<abono> = new MatTableDataSource();
  displayedColumns: string[] = ['fecha', 'cantidad', 'nota'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { abonos: abono[] }) {}

  ngOnInit(): void {
    this.dataSource.data = this.data.abonos.map((abono) => ({
      ...abono,
      fecha:
        abono.fecha instanceof Timestamp ? abono.fecha.toDate() : abono.fecha,
    }));
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
