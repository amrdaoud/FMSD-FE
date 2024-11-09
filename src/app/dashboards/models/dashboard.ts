import { ChartConfiguration } from "chart.js";

export interface ChartApiResponse {
    datasets: ChartConfiguration['data']['datasets'];
    labels: ChartConfiguration['data']['labels'];
    values: {name: string, value:string}[];
    cardValue?: CardValueModel
}
export interface CardValueModel {
    isUp: boolean;
    boldValue: string;
    boldValueTitle: string;
    lightValue: string;
    lightValueTitle: string;
}
export interface dashboardDateFilterModel {
    startDate: Date,
    endDate: Date
}