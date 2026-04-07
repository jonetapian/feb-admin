import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardService } from './dashboard.service';
import {
  DashboardKPIs,
  SalesByDate,
  TopProduct,
  SlowProduct,
  LowStockProduct,
  ComparisonData
} from '../../interfaces/product';

// Chart.js imports - Uncomment after installing ng2-charts and chart.js
// import { Chart, registerables } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';

// Register Chart.js components - Uncomment after installing dependencies
// Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Add BaseChartDirective after installing ng2-charts
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  // Data properties
  kpis: DashboardKPIs | null = null;
  salesByDate: SalesByDate[] = [];
  topProducts: TopProduct[] = [];
  slowProducts: SlowProduct[] = [];
  lowStockProducts: LowStockProduct[] = [];
  comparison: ComparisonData | null = null;

  // Loading states
  loadingKPIs = false;
  loadingSalesChart = false;
  loadingTopProducts = false;
  loadingSlowProducts = false;
  loadingLowStock = false;
  loadingComparison = false;

  // Date filters
  startDate = '';
  endDate = '';

  // Chart data - Uncomment after installing ng2-charts and chart.js
  // salesChartData: any = {
  //   labels: [],
  //   datasets: [{
  //     label: 'Vendas (R$)',
  //     data: [],
  //     borderColor: '#3B82F6',
  //     backgroundColor: 'rgba(59, 130, 246, 0.1)',
  //     tension: 0.4
  //   }]
  // };

  // salesChartOptions: any = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Vendas por Período'
  //     }
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       ticks: {
  //         callback: (value: any) => 'R$ ' + value.toLocaleString('pt-BR')
  //       }
  //     }
  //   }
  // };

  // topProductsChartData: any = {
  //   labels: [],
  //   datasets: [{
  //     label: 'Receita (R$)',
  //     data: [],
  //     backgroundColor: [
  //       '#3B82F6',
  //       '#10B981',
  //       '#F59E0B',
  //       '#EF4444',
  //       '#8B5CF6'
  //     ]
  //   }]
  // };

  // topProductsChartOptions: any = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'right',
  //     }
  //   }
  // };

  ngOnInit() {
    this.setDefaultDates();
    this.loadAllData();
  }

  setDefaultDates() {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    this.startDate = thirtyDaysAgo.toISOString().split('T')[0];
    this.endDate = today.toISOString().split('T')[0];
  }

  setQuickFilter(days: number) {
    const today = new Date();
    const start = new Date();
    start.setDate(today.getDate() - days);

    this.startDate = start.toISOString().split('T')[0];
    this.endDate = today.toISOString().split('T')[0];
    this.loadAllData();
  }

  loadAllData() {
    this.loadKPIs();
    this.loadSalesChart();
    this.loadTopProducts();
    this.loadSlowProducts();
    this.loadLowStock();
    this.loadComparison();
  }

  loadKPIs() {
    this.loadingKPIs = true;
    this.dashboardService.getKPIs(this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.kpis = data;
        this.loadingKPIs = false;
      },
      error: (error) => {
        console.error('Erro ao carregar KPIs:', error);
        this.loadingKPIs = false;
      }
    });
  }

  loadSalesChart() {
    this.loadingSalesChart = true;
    this.dashboardService.getSalesByDate(this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.salesByDate = data;
        // this.updateSalesChart(); // Uncomment after installing chart dependencies
        this.loadingSalesChart = false;
      },
      error: (error) => {
        console.error('Erro ao carregar vendas por data:', error);
        this.loadingSalesChart = false;
      }
    });
  }

  loadTopProducts() {
    this.loadingTopProducts = true;
    this.dashboardService.getTopProducts(this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.topProducts = data;
        // this.updateTopProductsChart(); // Uncomment after installing chart dependencies
        this.loadingTopProducts = false;
      },
      error: (error) => {
        console.error('Erro ao carregar top produtos:', error);
        this.loadingTopProducts = false;
      }
    });
  }

  loadSlowProducts() {
    this.loadingSlowProducts = true;
    this.dashboardService.getSlowProducts(this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.slowProducts = data;
        this.loadingSlowProducts = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos sem venda:', error);
        this.loadingSlowProducts = false;
      }
    });
  }

  loadLowStock() {
    this.loadingLowStock = true;
    this.dashboardService.getLowStock().subscribe({
      next: (data) => {
        this.lowStockProducts = data;
        this.loadingLowStock = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos com estoque baixo:', error);
        this.loadingLowStock = false;
      }
    });
  }

  loadComparison() {
    this.loadingComparison = true;
    this.dashboardService.getComparison(this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.comparison = data;
        this.loadingComparison = false;
      },
      error: (error) => {
        console.error('Erro ao carregar comparação:', error);
        this.loadingComparison = false;
      }
    });
  }

  // Chart update methods - Uncomment after installing ng2-charts and chart.js
  // updateSalesChart() {
  //   this.salesChartData.labels = this.salesByDate.map(item =>
  //     new Date(item.date).toLocaleDateString('pt-BR')
  //   );
  //   this.salesChartData.datasets[0].data = this.salesByDate.map(item => item.total);
  // }

  // updateTopProductsChart() {
  //   this.topProductsChartData.labels = this.topProducts.map(product => product.productName);
  //   this.topProductsChartData.datasets[0].data = this.topProducts.map(product => product.totalRevenue);
  // }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatPercentage(value: number): string {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  }

  getStatusColor(status: string): string {
    return status === 'CRITICAL' ? 'text-red-600 bg-red-100' : 'text-yellow-600 bg-yellow-100';
  }

  getGrowthColor(value: number): string {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  }
}