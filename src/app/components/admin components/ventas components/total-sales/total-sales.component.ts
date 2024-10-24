import { Component } from '@angular/core';
import { AdminInfoService } from '../../../../services/admin-info.service';

@Component({
  selector: 'app-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.css'],
})
export class TotalSalesComponent {
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  totalSales: number = 0;

  // Cambia la declaración de view a una tupla
  monthlySalesData: { name: string; value: number }[] = []; // Datos para el gráfico
  gradient: boolean = false; // Ajusta si deseas usar gradientes
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

  calculateMonthlySales() {
    const sales = this.adminInfoService.getSales();

    this.monthlySales = Array(12)
      .fill(0)
      .map((_, index) => ({
        month: this.months[index].name,
        total: 0,
      }));

    const filteredSales = sales.filter((sale) => {
      const saleDate = new Date(sale.fecha);
      return saleDate.getFullYear() === this.selectedYear;
    });

    filteredSales.forEach((sale) => {
      const saleDate = new Date(sale.fecha);
      const monthIndex = saleDate.getMonth();
      this.monthlySales[monthIndex].total += sale.precio;
    });

    this.updateChartData();
    this.totalSales = this.monthlySales[this.selectedMonth - 1].total;
  }

  updateChartData() {
    this.chartData = this.monthlySales.map((sale) => ({
      name: sale.month,
      value: sale.total,
    }));
  }

  updateMonthlySalesData() {
    const sales = this.adminInfoService.getSales();
    const monthlySales = Array(12).fill(0); // Inicializa un arreglo para los 12 meses

    sales.forEach((sale) => {
      const saleDate = new Date(sale.fecha);
      monthlySales[saleDate.getMonth()] += sale.precio; // Acumula ventas por mes
    });

    this.monthlySalesData = monthlySales.map((value, index) => ({
      name: this.months[index].name,
      value: value,
    }));
  }
}
