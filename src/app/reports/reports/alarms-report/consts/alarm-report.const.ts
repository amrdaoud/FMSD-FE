import { DatePipe } from "@angular/common";
import { DataTableColumnDef } from "../../../../app-reusables/elements/data-table/models/data-table-column-def";
import { DataTableFilter } from "../../../../app-reusables/elements/data-table/models/data-table-filter";
import { AlarmRequestViewModel } from "../models/alarm-request-view-model";
import { inject } from "@angular/core";
import { GenericService } from "../../../services/generic.service";
export class AlarmReportConsts {
    private static currentDate = new Date();
    private static lastWeekDate = new Date(this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    static columns: DataTableColumnDef[] = [
        {name: '#', property: 'id', isSort: true},
        {name: 'Station', property: 'stationName', isSort: true},
        {name: 'Type', property: 'alarmType', isSort: true},
        {name: 'Code', property: 'alarmCode', isSort: true},
        {name: 'Description', property: 'description', isSort: true},
        {name: 'Status', property: 'status', isSort: true, highlights: [
            {operation: '=', value: 'active', color: 'rgb(26, 213, 152)', backgroundColor: 'rgba(26, 213, 152,0.3)'},
            {operation: '=', value: 'inactive', color: 'rgb(234, 58, 61)', backgroundColor: 'rgba(234, 58, 61, 0.2)'},
        ]},
        {name: 'Acknowledge By', property: 'acknowledgeUser', isSort: true},
        {name: 'Time', property: 'alarmTime', isSort: true, pipe: DatePipe, pipeArgs: 'MMM dd,yyyy HH:mm:ss'},
        {name: 'Inactive Time', property: 'inactiveTime', isSort: true, pipe: DatePipe, pipeArgs: 'MMM dd,yyyy HH:mm:ss'},
        {name: 'Acknowledge Time', property: 'acknowledgeTime', isSort: true, pipe: DatePipe, pipeArgs: 'MMM dd,yyyy HH:mm:ss'}
    ];
    static initialFilters: AlarmRequestViewModel = {
        pageIndex: 0,
        pageSize: 20,
        searchQuery: '',
        sortActive: 'alarmTime',
        sortDirection: 'desc',
        startDate: this.lastWeekDate,
        endDate: this.currentDate
    }
    static get filters(): DataTableFilter[] {
        return [
            {
                type: 'twoDates', controlName: 'startDate',
                controlName2: 'endDate', isMandatory: false,
            },
            {
                type: 'select', controlName: 'alarmTypes',
                isMulti: true, data$: inject(GenericService).getAlarmTypes(),
                isLoading: inject(GenericService).loadingAlarmTypes,
                label: 'Alarm Type'
            },
            {
                type: 'select', controlName: 'cities',
                isMulti: true, data$: inject(GenericService).getCities(),
                isLoading: inject(GenericService).loadingCities,
                label: 'City'
            },
            {
                type: 'select', controlName: 'stationGuids',
                isMulti: true, data$: inject(GenericService).getStations(),
                isLoading: inject(GenericService).loadingStations,
                label: 'Station', valueProperty: 'guid', displayProperty: 'stationName'
            }
        ]
    }
}
