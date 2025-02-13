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
    endDate: Date,
    threshould : number,
    startTime : string,
    endTime : string
}
export interface IconModel {
    text: string;
    color: string;
}

export interface UnjustifiedDiscrepanciesInFuelVolumeResult
{
  startingVolume : number;
  endingVolume : number;
  fillmentTotalDispensedAmount : number;
  fillmentTotalMeasuredAmount : number;
  distributionTotalDispensedAmount : number;
  distributionTotalMeasuredAmount : number;
  diffrentFillmentDistributionDispensedAmount : number;
  diffrentFillmentDistributionMeasuredAmount : number;

}

export interface CityExpectedToProvideFuelResult
{
  gUID? : string;
  name? : string;
  currentAvailableVolume? : number;
  currentAvailablePercentage? : number;
  dailyAverageConsuming? : number;
  availableDays? : number;
}

