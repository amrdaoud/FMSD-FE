import { ChartConfiguration } from "chart.js";

export interface ChartApiResponse {
    datasets: ChartConfiguration['data']['datasets'];
    labels: ChartConfiguration['data']['labels'];
    values: {name: string, value:string}[];
}
export interface DataSetModel {
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    fill?: string;
    label?: string;
    stack?: string;
    yAxisId?: string;
}