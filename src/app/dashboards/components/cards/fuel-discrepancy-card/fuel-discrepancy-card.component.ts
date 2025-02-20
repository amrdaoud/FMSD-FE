import { Component, computed, EventEmitter, inject, Input, input, OnInit, Output, output, signal, Signal } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardDateFilterModel, LookUpDto } from '../../../models/dashboard';
import { DashboardCardLayoutComponent } from '../../dashboard-card-layout/dashboard-card-layout.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, merge, Observable, of, startWith, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { SimpleLoaderComponent } from '../../../../app-reusables/elements/loaders/simple-loader/simple-loader.component';

@Component({
  selector: 'app-fuel-discrepancy-card',
  standalone: true,
  imports: [DashboardCardLayoutComponent,CommonModule,MatIconModule,MatButtonToggleModule,
    MatAutocompleteModule , MatFormFieldModule,FormsModule,ReactiveFormsModule,
    MatInputModule,AsyncPipe,MatSelectModule,SimpleLoaderComponent
  ],
  templateUrl: './fuel-discrepancy-card.component.html',
  styleUrl: './fuel-discrepancy-card.component.scss',
  providers: [DatePipe] // Add DatePipe to the providers array

})
export class FuelDiscrepancyCardComponent {

 private dashboardService = inject(DashboardService);
  loading = this.dashboardService.fuelVolumeDiscrepancyLoading;
  dateFilter =  input.required<DashboardDateFilterModel>();
  options : LookUpDto[] = [];
  myControl = new FormControl<string | LookUpDto>('');
  stationOptions = this.dashboardService.getFuelStations();
  filteredOptions: Observable<LookUpDto[]> = of([]);


  report = toSignal(
    merge(
      toObservable(this.dateFilter).pipe(
        map((dateFilter) => ({
          ...dateFilter,
          stationGUID: (this.myControl.value && typeof this.myControl.value === 'object')
            ? this.myControl.value.id
            : '', // Ensure stationGUID is valid
        }))
      ),
      this.myControl.valueChanges.pipe(
        filter(value => typeof value === 'object'), // Ensure it's an object (selected item)
        map((selectedItem) => ({
          ...this.dateFilter(),
          stationGUID: selectedItem?.id ?? '', // Ensure stationGUID is never undefined
        }))
      )
    ).pipe(
      switchMap((filter) => this.dashboardService.getFuelVolumeDiscrepancyCard(filter))
    )
  );




  //  getOptions()
  //  {
  //   this.dashboardService.getFuelStations().subscribe((x) =>{
  //       this.options = x
  //       this.filteredOptions = this.myControl.valueChanges.pipe(
  //         startWith(''),
  //         map(value => {
  //           const name = typeof value === 'string' ? value : value?.name;
  //           return name ?
  //           this._filter(name as string) : this.options.slice();
  //         }),
  //       );
  //    })
  //  }

  //  displayFn(option: LookUpDto): string {
  //   return option && option.name ? option.name : '';
  // }



  // // private _filter(name: string): LookUpDto[] {
  // //   const filterValue = name.toLowerCase();

  // //   return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  // // }

}
