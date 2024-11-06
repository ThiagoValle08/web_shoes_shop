import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { abono } from '../../../../../interfaces/interfaces';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-show-abonos',
  templateUrl: './show-abonos.component.html',
  styleUrls: ['./show-abonos.component.css'],
})
export class ShowAbonosComponent implements OnInit {
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
