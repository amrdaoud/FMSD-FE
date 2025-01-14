import { DatePipe, DecimalPipe } from "@angular/common";
import { DataTableColumnDef } from "../../../../app-reusables/elements/data-table/models/data-table-column-def";
import { DataTableFilter } from "../../../../app-reusables/elements/data-table/models/data-table-filter";
import { inject } from "@angular/core";
import { GenericService } from "../../../services/generic.service";
import { TankRequestViewModel } from "../models/tank-request-view-model";
import { of } from "rxjs";
export class TankMeasurementConsts {
    private static currentDate = new Date();
    private static lastWeekDate = new Date(this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    static columns: DataTableColumnDef[] = [
        {name: 'Name', property: 'groupingName', isSort: true},
        {name: 'Date', property: 'date', isSort: true, pipe: DatePipe, pipeArgs: 'MMM dd,yyyy HH:mm:ss'},
        {name: 'Fuel Level', property: 'fuelLevel', isSort: true, pipe: DecimalPipe},
        {name: 'Fuel Volume', property: 'fuelVolume', isSort: true, pipe: DecimalPipe},
        {name: 'Water Level', property: 'waterLevel', isSort: true, pipe: DecimalPipe},
        {name: 'Water Volume', property: 'waterVolume', isSort: true, pipe: DecimalPipe},
        {name: 'TCV', property: 'tcv', isSort: true, pipe: DecimalPipe},
        {name: 'Temperature', property: 'temperature', isSort: true, pipe: DecimalPipe}
    ];
    static initialFilters: TankRequestViewModel = {
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
            // {
            //     type: 'select', controlName: 'timeGroup',
            //     isMulti: false, data$: of(['Yearly', 'Monthly', 'Daily', 'Hourly']),
            //     label: 'Time Group'
            // },
            // {
            //     type: 'select', controlName: 'groupBy',
            //     isMulti: false, data$: of(['City', 'Station', 'Tank']),
            //     label: 'Group By'
            // },
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
            },
            {
                type: 'select', controlName: 'tankGuids',
                isMulti: true, data$: inject(GenericService).getTanks(),
                isLoading: inject(GenericService).loadingTanks,
                label: 'Tanks', valueProperty: 'guid', displayProperty: 'tankName'
            }
        ]
    }
}
