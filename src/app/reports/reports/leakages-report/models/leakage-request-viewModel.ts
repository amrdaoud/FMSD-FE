import { GeneralFilterModel } from "../../../../app-reusables/models/general-filter";

export interface LeakageRequestViewModel extends GeneralFilterModel {
    startDate?: Date;
    endDate?: Date;
    cities?: string[];
    stationGuids?: string[];
    tankGuids?: string[];
    leakageTypes?: number[];
}