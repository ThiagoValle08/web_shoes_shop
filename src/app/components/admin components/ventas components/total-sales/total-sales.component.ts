import { Component, OnInit } from '@angular/core';
import { AdminInfoService } from '../../../../services/admin-info.service';

@Component({
  selector: 'app-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.css'],
})
export class TotalSalesComponent implements OnInit {
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  totalSales: number = 0;

  monthlySalesData: { name: string; value: number }[] = [];
  gradient: boolean = false;
  years: number[] = [];

  colorScheme = {
    domain: ['red', 'blue', 'cyan', 'black'],
  };

  months = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 },
  ];

  monthlySales: { month: string; total: number }[] = [];
  chartData: { name: string; value: number }[] = [];

  constructor(private adminInfoService: AdminInfoService) {
    this.initializeYears();
  }

  ngOnInit() {
    this.calculateMonthlySales();
  }

  get selectedMonthName(): string {
    return (
      this.months.find((month) => month.value === this.selectedMonth)?.name ||
      ''
    );
  }

  initializeYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2000; year--) {
      this.years.push(year);
    }
  }

  async calculateMonthlySales() {
    try {
      const sales = await this.adminInfoService.getSales();

      // Inicializa monthlySales con 0 para cada mes
      this.monthlySales = Array(12)
        .fill(0)
        .map((_, index) => ({
          month: this.months[index].name,
          total: 0,
        }));

      // Filtra las ventas por el año seleccionado
      const filteredSales = sales.filter((sale) => {
        const saleDate = this.convertTimestampToDate(sale.fecha);
        return saleDate.getFullYear() === this.selectedYear;
      });

      // Suma el total de ventas por mes
      filteredSales.forEach((sale) => {
        const saleDate = this.convertTimestampToDate(sale.fecha);
        const monthIndex = saleDate.getMonth();
        this.monthlySales[monthIndex].total += sale.precio;
      });

      this.updateChartData();
      this.totalSales = this.monthlySales[this.selectedMonth - 1].total;
    } catch (error) {
      console.error('Error al calcular las ventas mensuales:', error);
    }
  }

  updateChartData() {
    this.chartData = this.monthlySales.map((sale) => ({
      name: sale.month,
      value: sale.total,
    }));
  }

  convertTimestampToDate(timestamp: any): Date {
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate(); // Convierte el Timestamp de Firebase a Date
    }
    return new Date(timestamp); // En caso de que sea otro formato
  }

  async updateMonthlySalesData() {
    try {
      const sales = await this.adminInfoService.getSales();
      const monthlySales = Array(12).fill(0); // Inicializa un arreglo para los 12 meses

      sales.forEach((sale) => {
        const saleDate = this.convertTimestampToDate(sale.fecha);
        monthlySales[saleDate.getMonth()] += sale.precio; // Acumula ventas por mes
      });

      this.monthlySalesData = monthlySales.map((value, index) => ({
        name: this.months[index].name,
        value: value,
      }));
    } catch (error) {
      console.error(
        'Error al actualizar los datos de ventas mensuales:',
        error
      );
    }
  }
}
