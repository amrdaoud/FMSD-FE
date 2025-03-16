import { GeneralFilterModel } from "../../../../app-reusables/models/general-filter";

export interface CalibrationRequestViewModel extends GeneralFilterModel {
    startDate?: Date;
    endDate?: Date;
    cities?: string[];
    stationGuids?: string[];
    tankGuids?: string[];
    pumpIds?: string[];
}