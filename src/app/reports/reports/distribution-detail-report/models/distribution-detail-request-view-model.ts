import { GeneralFilterModel } from "../../../../app-reusables/models/general-filter";

export interface DistributionDetailRequestViewModel extends GeneralFilterModel {
    startDate?: Date;
    endDate?: Date;
    cities?: string[];
    stationGuids?: string[];
    tankGuids?: string[];
    operationTypeIds?: number[];
}