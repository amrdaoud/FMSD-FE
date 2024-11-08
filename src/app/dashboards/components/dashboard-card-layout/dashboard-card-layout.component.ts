import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard-card-layout',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './dashboard-card-layout.component.html',
  styleUrl: './dashboard-card-layout.component.scss'
})
export class DashboardCardLayoutComponent {

}
