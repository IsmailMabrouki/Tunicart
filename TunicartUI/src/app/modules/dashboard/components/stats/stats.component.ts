import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { AdminService } from '../../../../services/services';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  public barChartLabels: string[] = [];
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [{
      data: [],
      label: 'Order Status Count'
    }]
  };

  public pieChartLabels: string[] = ['Active Users', 'New Users'];
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [{
      data: []
    }]
  };

  public averageRating: number = 0;
  public totalSales: number = 0;
  public totalUsers: number = 0;
  public activeUsers: number = 0;
  public newUsers: number = 0;
  public totalOrders: number = 0;
  public averageOrderValue: number = 0;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getSystemStats().subscribe(stats => {
      this.updateCharts(stats);
    });
  }

  private updateCharts(stats: any): void {
    console.log('stats :', stats);

    // Update Bar Chart for Order Status Count
    const orderStatusCount = stats.orderStatusCount;
    this.barChartLabels = Object.keys(orderStatusCount);
    this.barChartData.labels = this.barChartLabels;
    this.barChartData.datasets[0].data = Object.values(orderStatusCount);

    // Update Pie Chart for User Statistics
    this.pieChartData.datasets[0].data = [stats.activeUsers, stats.newUsers];

    // Update Other Statistics
    this.averageRating = stats.averageRating;
    this.totalSales = stats.totalSales;
    this.totalUsers = stats.totalUsers;
    this.activeUsers = stats.activeUsers;
    this.newUsers = stats.newUsers;
    this.totalOrders = stats.totalOrders;
    this.averageOrderValue = stats.averageOrderValue;
  }
}
