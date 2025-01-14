import { computed, Injectable, Signal } from '@angular/core';
import { ChartConfiguration,Chart, registerables } from 'chart.js';
@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() {
    Chart.register(...registerables);
    // Chart.defaults.backgroundColor = '#81d4fa'; // Bar fill color
    // Chart.defaults.borderColor = '#0288d1'; // Border color
    Chart.defaults.color = '#212121'; // Text color
    Chart.defaults.font.family = 'Arial, sans-serif'; // Custom font
    Chart.defaults.plugins.legend.labels.color = '#4e342e'; // Legend text color
  }
  createChartData(
    datasets: Signal<ChartConfiguration['data']['datasets']>,
    labels: Signal<ChartConfiguration['data']['labels']>): Signal<ChartConfiguration['data']> {
      return computed(() => {
        return {
          datasets: datasets(),
          labels: labels()
        }
      })
    }
  createChartOptions(
    responsive: Signal<boolean>,
    maintainAspectRatio :Signal<boolean>,
    displayLegend: Signal<boolean>,
    displayX: Signal<boolean>,
    displayY: Signal<boolean>,
    pointRadius: Signal<number>,
    lineTension: Signal<number>,
    lineWidth: Signal<number>,
    yType?: Signal<any>,
    stacked?: Signal<boolean>
  ): Signal<ChartConfiguration['options']> {
    return computed(() => {
      return {
        responsive: responsive(),
        maintainAspectRatio: maintainAspectRatio(),
        plugins: {
          legend: {
            display: displayLegend(),
            position: 'bottom'
          },
        },
        scales: {
          x: {
            display: displayX()
          },
          y: {
            display: displayY(),
            type: yType ? yType() : 'linear',
            stacked: stacked ? stacked() : false
          }
        },
        elements: {
          point: {
            radius: pointRadius()
          },
          line: {
            tension: lineTension(),
            borderWidth: lineWidth()
          }
        }
      }
    });
  }
}
