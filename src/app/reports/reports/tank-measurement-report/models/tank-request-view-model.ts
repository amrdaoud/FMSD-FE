import { GeneralFilterModel } from "../../../../app-reusables/models/general-filter";


export interface TankRequestViewModel extends GeneralFilterModel {
    startDate?: Date;
    endDate?: Date;
    cities?: string[];
    stationGuids?: string[];
    timeGroup?: string;
    groupBy?: string;
    tankGuids?: string[];
}