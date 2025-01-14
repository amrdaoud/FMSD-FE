import { GeneralFilterModel } from "../../../../app-reusables/models/general-filter";

export interface FuelTransactionRequestViewModel extends GeneralFilterModel {
    startDate?: Date;
    endDate?: Date;
    cities?: string[];
    stationNames?: string[];
    tankGuids?: string[];
    statusIds?: number[];
    operationTypeIds?: number[];
}