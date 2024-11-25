import { computed, Injectable, Signal } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }
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
    yType?: Signal<any>
  ): Signal<ChartConfiguration['options']> {
    return computed(() => {
      return {
        responsive: responsive(),
        maintainAspectRatio: maintainAspectRatio(),
        plugins: {
          legend: {
            display: displayLegend(),
          },
        },
        scales: {
          x: {
            display: displayX()
          },
          y: {
            display: displayY(),
            type: yType ? yType() : 'linear'
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
