import { GeneralFilterModel } from "../../../../app-reusables/models/general-filter";

export interface AlarmRequestViewModel extends GeneralFilterModel {
    startDate: Date | null;
    endDate: Date | null;
    cities?: string[] | null;
    stationGuids?: string[] | null;
    alarmTypes?: string[] | null;
}

