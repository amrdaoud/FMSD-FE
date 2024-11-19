import { Component, computed, effect, EventEmitter, inject, input, model, Output, viewChild } from '@angular/core';
import { DataTableColumnDef } from '../../models/data-table-column-def';
import { DataTableFilter } from '../../models/data-table-filter';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataTableService } from '../../services/data-table.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ACTION_ICON, CALENDAR_ICON, FILTER_ICON, SEARCH_ICON } from '../../consts/data-table-icons.const';
import { GeneralFilterModel } from '../../../../models/general-filter';
import { DynamicPipe } from "../../../dynamic-pipe/dynamic.pipe";
import { HighlighterDirective } from '../../../highlighter-directive/highlighter.directive';
import { AsyncPipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DynamicPipe,
    HighlighterDirective,
    AsyncPipe,
    MatProgressBarModule
],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  title = input('');
  subtitle = input('');
  columns = input.required<DataTableColumnDef[]>();
  data = input<any[]>([]);
  dataSize = input<number>(0);
  pageSize = input(20);
  pageIndex = input(0);
  filters = input<DataTableFilter[]>([]);
  sortActive = input<string>('id');
  sortDirection = input<'asc'|'desc'>('asc');
  loading = input<boolean>(false);
  loadingDownload = input<boolean>(false);

  requestObject = model.required<GeneralFilterModel>();

  paginator = viewChild.required(MatPaginator)
  sort = viewChild.required(MatSort);
  @Output() downloadRequested = new EventEmitter();
  private dataTableService = inject(DataTableService);
  private route = inject(ActivatedRoute);

  private router = inject(Router);

  searchControl = new FormControl('');
  filterForm = computed(() => 
    this.dataTableService.createFilterForm(this.filters()))
    private searchQueryChange = toSignal(
    this.searchControl.valueChanges.pipe(
    debounceTime(400),
    distinctUntilChanged(),
    tap(() => this.paginator().firstPage())
    ),
  );
  private filterFormChange = toSignal(toObservable(this.filterForm).pipe(
    switchMap(frm => frm.valueChanges),
    filter(() => this.filterForm().valid),
    debounceTime(400),
    distinctUntilChanged(),
    tap(() => this.paginator().firstPage())
  ));
  paginator$ = toSignal(toObservable(this.paginator).pipe(
    switchMap(x => x.page)
  ))

  sort$ = toSignal(toObservable(this.sort).pipe(
    switchMap(x => x.sortChange),
    tap(() => this.paginator().firstPage())
  ));

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIconLiteral('filter-icon', sanitizer.bypassSecurityTrustHtml(FILTER_ICON));
    iconRegistry.addSvgIconLiteral('search-icon', sanitizer.bypassSecurityTrustHtml(SEARCH_ICON));
    iconRegistry.addSvgIconLiteral('action-icon', sanitizer.bypassSecurityTrustHtml(ACTION_ICON));
    iconRegistry.addSvgIconLiteral('calendar-icon', sanitizer.bypassSecurityTrustHtml(CALENDAR_ICON));
    
    effect(() => {
      this.requestObject.set(
        this.dataTableService.createRequestObject(
          this.paginator$()?.pageIndex ?? this.pageIndex(),
          this.paginator$()?.pageSize ?? this.pageSize(),
          this.sort$()?.active ?? this.sortActive(),
          this.sort$()?.direction ?? this.sortDirection(),
          this.searchQueryChange() ?? '',
          this.filterFormChange()
        )
      );
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: this.filterForm().value
      })
    }, {allowSignalWrites: true})
  }
  dataSource = computed(() => new MatTableDataSource(this.data()));
  displayColumns = computed(() => this.columns().map(x => x.property));
  requestDownload() {
    this.downloadRequested.emit();
  }
}
