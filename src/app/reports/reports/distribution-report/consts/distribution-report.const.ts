import { DatePipe, DecimalPipe } from "@angular/common";
import { DataTableColumnDef } from "../../../../app-reusables/elements/data-table/models/data-table-column-def";
import { DataTableFilter } from "../../../../app-reusables/elements/data-table/models/data-table-filter";
import { inject } from "@angular/core";
import { GenericService } from "../../../services/generic.service";
import { of } from "rxjs";
import { FuelTransactionRequestViewModel } from "../models/fuel-transaction-request-view-model";
export class FuelTransactionConsts {
    private static currentDate = new Date();
    private static lastWeekDate = new Date(this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    static columns: DataTableColumnDef[] = [
        {name: '#', property: 'id', isSort: true},
        {name: 'Tank', property: 'groupingName', isSort: true},
        {name: 'Start', property: 'startTime', isSort: true, pipe: DatePipe, pipeArgs: 'MMM dd,yyyy HH:mm:ss'},
        {name: 'End', property: 'endTime', isSort: true, pipe: DatePipe, pipeArgs: 'MMM dd,yyyy HH:mm:ss'},
        {name: 'Pump', property: 'pumb', isSort: true},
        {name: 'Ordered', property: 'orderedAmount', isSort: true, pipe: DecimalPipe},
        {name: 'Dispensed', property: 'dispensedAmount', isSort: true, pipe: DecimalPipe},
        {name: 'Measured', property: 'measuredAmount', isSort: true, pipe: DecimalPipe},
        {name: 'Dispensed To', property: 'dispensedTo', isSort: true},
        {name: 'Status', property: 'status', isSort: true},
        {name: 'User', property: 'userName', isSort: true},
        {name: 'Requisition', property: 'requesitionNumber', isSort: true},
        {name: 'Driver', property: 'driverName', isSort: true},
        {name: 'Accompanying', property: 'accompanyingName', isSort: true},
        {name: 'Plate', property: 'plate', isSort: true},
        {name: 'Driver License', property: 'driverLicense', isSort: true},
        {name: 'Note', property: 'note', isSort: true},
        {name: 'Liter Price', property: 'literPrice', isSort: true, pipe: DecimalPipe},
        {name: 'Total Price', property: 'totalPrice', isSort: true, pipe: DecimalPipe},
        {name: 'Type', property: 'operationType', isSort: true},
        
    ];
    static initialFilters: FuelTransactionRequestViewModel = {
        pageIndex: 0,
        pageSize: 20,
        searchQuery: '',
        sortActive: 'startTime',
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
            //     type: 'select', controlName: 'cities',
            //     isMulti: true, data$: inject(GenericService).getCities(),
            //     isLoading: inject(GenericService).loadingCities,
            //     label: 'City'
            // },
            // {
            //     type: 'select', controlName: 'cities',
            //     isMulti: true, data$: inject(GenericService).getCities(),
            //     isLoading: inject(GenericService).loadingCities,
            //     label: 'City'
            // },
            {
                type: 'select', controlName: 'cities',
                isMulti: true, data$: inject(GenericService).getCities(),
                isLoading: inject(GenericService).loadingCities,
                label: 'City'
            },
            {
                type: 'select', controlName: 'stationNames',
                isMulti: true, data$: inject(GenericService).getStations(),
                isLoading: inject(GenericService).loadingStations,
                label: 'Station', valueProperty: 'stationName', displayProperty: 'stationName'
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
