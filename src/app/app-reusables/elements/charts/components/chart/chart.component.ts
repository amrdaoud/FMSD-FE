import { Component, inject, input, model } from '@angular/core';
import { ChartConfiguration, ChartEvent } from 'chart.js';
import { SimpleLoaderComponent } from "../../../loaders/simple-loader/simple-loader.component";
import { BaseChartDirective } from 'ng2-charts';
import { ChartService } from '../../services/chart.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [SimpleLoaderComponent, BaseChartDirective, NgStyle],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  private chartService = inject(ChartService)

  datasets = input.required<ChartConfiguration['data']['datasets']>();
  labels = input.required<ChartConfiguration['data']['labels']>();
  chartType = input<ChartConfiguration['type']>('line');
  responsive = input<boolean>(true);
  maintainAspectRatio = input<boolean>(false);
  displayLegend = input<boolean>(true);
  displayX = input<boolean>(true);
  displayY = input<boolean>(true);
  pointRadius = input<number>(0);
  lineTension = input<number>(0.2);
  lineWidth = input<number>(2);
  loading = input<boolean>(false);

  clickedChartObject = model<{serie?: string, label?: string}>();

  chartHeightPercent = input<number>(100);

  chartData = this.chartService.createChartData(this.datasets, this.labels);
  chartOptions = this.chartService.createChartOptions(
    this.responsive,
    this.maintainAspectRatio,
    this.displayLegend,
    this.displayX,
    this.displayY,
    this.pointRadius,
    this.lineTension,
    this.lineWidth
  )

  chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: any[];
  }): void {
    if(active && active[0]) {
      this.clickedChartObject.set
      (
        {
          serie: this.datasets()[active[0].datasetIndex].label,
          label: this.labels()![active[0].index]!.toString()
        }
      );
    }
  }
}
