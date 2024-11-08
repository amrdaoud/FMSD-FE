import { Component, input, model, signal } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss'
})
export class ChartCardComponent {
  options = input<string[]>([]);
  selectedOption = signal<number>(0);
  title = input<string>('Fuel Availability');
  subtitle = input<string>('Total fuel availability over strategic stations (click to drill down)');
  drillParameter = model<{index: number, label: string, parentLabel: string}[]>([]);
  values = input<{name: string, value: string}[][]>([]);
  stopindex = input<number>(2);
}
