import { DatePipe, DecimalPipe } from "@angular/common";
import { DataTableColumnDef } from "../../../../app-reusables/elements/data-table/models/data-table-column-def";
import { DataTableFilter } from "../../../../app-reusables/elements/data-table/models/data-table-filter";
import { inject } from "@angular/core";
import { GenericService } from "../../../services/generic.service";
import { of } from "rxjs";
import { LeakageRequestViewModel } from "../models/leakage-request-viewModel";

export class LeakageReportConst {
    private static currentDate = new Date();
    private static lastWeekDate = new Date(this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    static columns: DataTableColumnDef[] = [
        {name: 'Tank Name', property: 'groupingName', isSort: true},
        {name: 'Deviation', property: 'deviation', isSort: true, pipe: DecimalPipe},
        {name: 'Limit', property: 'limit', isSort: true, pipe: DecimalPipe},
        {name: 'Leakage', property: 'leakage', isSort: true},
        {name: 'leakage Type', property: 'leakageType', isSort: true},
        {name: 'CreatedAt', property: 'createdAt', isSort: true ,pipe: DatePipe, pipeArgs: 'MMM dd,yyyy HH:mm:ss'},
       
        
    ];
    static initialFilters: LeakageRequestViewModel = {
        pageIndex: 0,
        pageSize: 20,
        searchQuery: '',
        sortActive: 'createdAt',
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
                type: 'select', controlName: 'leakageTypes',
                isMulti: true, data$: inject(GenericService).getLeakageTypes(),
                isLoading: inject(GenericService).loadingLeakageTypes,
                label: 'Leakage Types', valueProperty: 'name', displayProperty: 'name'
            }
        ]
    }
}
