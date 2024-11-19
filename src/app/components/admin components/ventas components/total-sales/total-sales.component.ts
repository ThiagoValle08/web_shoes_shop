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
  annualSales: number = 0; // Nueva variable para almacenar el total anual

  years: number[] = [];
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
  chartData: any;
  chartOptions: any;
  isLargeScreen: boolean = true;

  constructor(private adminInfoService: AdminInfoService) {
    this.initializeYears();
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  ngOnInit() {
    this.calculateMonthlySales();
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              return `COP ${context.raw.toLocaleString()}`;
            },
          },
        },
      },
    };
  }

  checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 768;
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
      this.monthlySales = Array(12)
        .fill(0)
        .map((_, index) => ({ month: this.months[index].name, total: 0 }));

      const filteredSales = sales.filter((sale) => {
        const saleDate = this.convertTimestampToDate(sale.fecha);
        return saleDate.getFullYear() === this.selectedYear;
      });

      filteredSales.forEach((sale) => {
        const saleDate = this.convertTimestampToDate(sale.fecha);
        const monthIndex = saleDate.getMonth();
        this.monthlySales[monthIndex].total += sale.precio;
      });

      // Calcular el total anual sumando las ventas mensuales
      this.annualSales = this.monthlySales.reduce(
        (sum, sale) => sum + sale.total,
        0
      );

      this.updateChartData();
      this.totalSales = this.monthlySales[this.selectedMonth - 1].total;
    } catch (error) {
      console.error('Error al calcular las ventas mensuales:', error);
    }
  }

  updateChartData() {
    const monthColors = [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(102, 255, 153, 0.5)',
      'rgba(255, 102, 255, 0.5)',
      'rgba(102, 153, 255, 0.5)',
      'rgba(255, 128, 0, 0.5)',
      'rgba(0, 255, 128, 0.5)',
      'rgba(204, 102, 255, 0.5)',
    ];

    this.chartData = {
      labels: this.monthlySales.map((sale) => sale.month),
      datasets: [
        {
          label: 'Total Ventas (COP)',
          data: this.monthlySales.map((sale) => sale.total),
          backgroundColor: monthColors,
          hoverBackgroundColor: monthColors.map((color) =>
            color.replace('0.5', '0.7')
          ),
        },
      ],
    };
  }

  convertTimestampToDate(timestamp: any): Date {
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate();
    }
    return new Date(timestamp);
  }
}
