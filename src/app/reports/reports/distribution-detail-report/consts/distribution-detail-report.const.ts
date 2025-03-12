import { DatePipe, DecimalPipe } from "@angular/common";
import { DataTableColumnDef } from "../../../../app-reusables/elements/data-table/models/data-table-column-def";
import { DataTableFilter } from "../../../../app-reusables/elements/data-table/models/data-table-filter";
import { inject } from "@angular/core";
import { GenericService } from "../../../services/generic.service";
import { of } from "rxjs";
import { DistributionDetailRequestViewModel } from "../models/distribution-detail-request-view-model";

export class DistributionDetailReportConst {
    private static currentDate = new Date();
    private static lastWeekDate = new Date(this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    static columns: DataTableColumnDef[] = [
        {name: 'Tank Name', property: 'tankName', isSort: true},
        {name: 'Fuel Volume Before', property: 'fuelVolumeBefore', isSort: true},
        {name: 'Fuel Volume After', property: 'fuelVolumeAfter', isSort: true, pipe: DecimalPipe},
        {name: 'Tcv Before', property: 'tcvBefore', isSort: true, pipe: DecimalPipe},
        {name: 'Tcv After', property: 'tcvAfter', isSort: true, pipe: DecimalPipe},
        {name: 'Started', property: 'startedOn', isSort: true ,pipe: DatePipe, pipeArgs: 'MMM dd,yyyy HH:mm:ss'},
        {name: 'Ended', property: 'endedOn', isSort: true ,pipe: DatePipe, pipeArgs: 'MMM dd,yyyy HH:mm:ss'}
       
        
    ];
    static initialFilters: DistributionDetailRequestViewModel = {
        pageIndex: 0,
        pageSize: 20,
        searchQuery: '',
        sortActive: 'startedOn',
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
                type: 'select', controlName: 'operationTypeIds',
                isMulti: true, data$: inject(GenericService).getOperationTypes(),
                isLoading: inject(GenericService).loadingTanks,
                label: 'Operation Types', valueProperty: 'id', displayProperty: 'name'
            }
        ]
    }
}
