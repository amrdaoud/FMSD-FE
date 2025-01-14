import { ChartConfiguration } from "chart.js";

export interface ChartApiResponse {
    datasets: ChartConfiguration['data']['datasets'];
    labels: ChartConfiguration['data']['labels'];
    values: {name: string, value:string}[];
    cardValue?: CardValueModel
}
export interface CardValueModel {
    icon?:IconModel;
    boldValue: string;
    boldValueTitle: string;
    lightValue: string;
    lightValueTitle: string;
}
export interface DashboardDateFilterModel {
    startDate: Date,
    endDate: Date
}
export interface IconModel {
    text: string;
    color: string;
}