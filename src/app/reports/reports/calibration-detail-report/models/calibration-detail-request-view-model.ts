import { GeneralFilterModel } from "../../../../app-reusables/models/general-filter";

export interface CalibrationDetailRequestViewModel extends GeneralFilterModel {
    startDate?: Date;
    endDate?: Date;
    cities?: string[];
    stationGuids?: string[];
    tankGuids?: string[];
}