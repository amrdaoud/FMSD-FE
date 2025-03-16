import { DatePipe, DecimalPipe } from "@angular/common";
import { DataTableColumnDef } from "../../../../app-reusables/elements/data-table/models/data-table-column-def";
import { DataTableFilter } from "../../../../app-reusables/elements/data-table/models/data-table-filter";
import { inject } from "@angular/core";
import { GenericService } from "../../../services/generic.service";
import { of } from "rxjs";
import { CalibrationRequestViewModel } from "../models/calibration-request-view-model";

export class CalibrationConsts {

    private static currentDate = new Date();
    private static lastWeekDate = new Date(this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    static columns: DataTableColumnDef[] = [
        {name: 'Start', property: 'startDate', isSort: true, pipe: DatePipe, pipeArgs: 'MMM dd,yyyy HH:mm:ss'},
        {name: 'End', property: 'endDate', isSort: true, pipe: DatePipe, pipeArgs: 'MMM dd,yyyy HH:mm:ss'},
        {name: 'Pump', property: 'pumpNumber', isSort: true},
        {name: 'User', property: 'userName', isSort: true},
        {name: 'Ordered Amount', property: 'orderedAmount', isSort: true, pipe: DecimalPipe},
        {name: 'Dispensed Amount', property: 'dispensedAmount', isSort: true, pipe: DecimalPipe},
        {name: 'Measured Amount', property: 'measuredAmount', isSort: true, pipe: DecimalPipe},
        {name: 'Note', property: 'note', isSort: false}
        
    ];
    static initialFilters: CalibrationRequestViewModel = {
        pageIndex: 0,
        pageSize: 20,
        searchQuery: '',
        sortActive: 'StartDate',
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
            },
            {
                type: 'select', controlName: 'pumpIds',
                isMulti: true, data$: inject(GenericService).getStationPumbs(),
                isLoading: inject(GenericService).loadingTanks,
                label: 'Pumbs Number', valueProperty: 'id', displayProperty: 'name'
            }
        ]
    }
}
