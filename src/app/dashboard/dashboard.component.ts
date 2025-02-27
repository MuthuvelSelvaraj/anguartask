import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
    // GST vs VAT Chart
    new Chart('gstVatChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'GST',
            data: [1200, 1900, 3000, 2500, 2000],
            backgroundColor: '#1E90FF',
          },
          {
            label: 'VAT',
            data: [800, 1500, 2000, 1800, 1200],
            backgroundColor: '#FF4500',
          },
        ],
      },
    });

    // User Role Distribution Chart
    new Chart('userRoleChart', {
      type: 'pie',
      data: {
        labels: ['Admin', 'Editor', 'Viewer', 'Guest'],
        datasets: [
          {
            label: 'User Roles',
            data: [40, 30, 20, 10],
            backgroundColor: ['#1E90FF', '#32CD32', '#FFD700', '#FF4500'],
          },
        ],
      },
    });
  }
}
