import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ParamMap } from '@angular/router';
import { DataTableFilter } from '../models/data-table-filter';
import { GeneralFilterModel } from '../../../models/general-filter';
import { MYVALIDATORS } from '../../../consts/validators.const';


@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  createFilterForm(filters:DataTableFilter[]): FormGroup {
    const frm = new FormGroup({}, {updateOn: 'change'});
    filters.forEach(element => {
      if(element.type === 'twoDates') {
        frm.addControl(element.controlName, new FormControl(element.control1InitialValue, { updateOn: element.updateOn , validators: element.isMandatory ? Validators.required : []}));
        frm.addControl(element.controlName2!, new FormControl(element.control2InitialValue, { updateOn: element.updateOn , validators: element.isMandatory ? Validators.required : []}));
      }
      else if(element.type === 'date') {
        frm.addControl(element.controlName, new FormControl('', { updateOn: element.updateOn , validators: element.isMandatory ? Validators.required : []}));
      }
      else if(element.type ==='slider') {
        frm.addControl(element.controlName, new FormControl('', { updateOn: element.updateOn , validators: element.isMandatory ? Validators.required : []}));
        frm.addControl(element.controlName2!, new FormControl('', { updateOn: element.updateOn , validators: element.isMandatory ? Validators.required : []}));
      }
      else {
        frm.addControl(element.controlName, new FormControl(null, { updateOn: element.updateOn , validators: element.isMandatory ? Validators.required : []}));
      }
    });
    if(filters.find(x => x.type === 'twoDates')) {
      frm.addValidators(MYVALIDATORS.dateRangeValidator)
    }
    return frm;
  }
  createFilterFormWithValue(filters: DataTableFilter[], params: ParamMap): FormGroup {
    const frm = new FormGroup({});
    filters.forEach(element => {
      if(element.type === 'twoDates') {
        frm.addControl(element.controlName, new FormControl(params.get(element.controlName) ? new Date(params.get(element.controlName) ?? 0) : null, { updateOn: element.updateOn , validators: element.isMandatory ? Validators.required : []}));
        frm.addControl(element.controlName2!, new FormControl(params.get(element.controlName2!) ? new Date(params.get(element.controlName2!) ?? 0) : null, { updateOn: element.updateOn , validators: element.isMandatory ? Validators.required : []}));
      }
      else if(element.type === 'date') {
        frm.addControl(element.controlName, new FormControl(params.get(element.controlName) ? new Date(params.get(element.controlName) ?? 0) : null, { updateOn: element.updateOn , validators: element.isMandatory ? Validators.required : []}));
      }
      else if(element.type ==='slider') {
        frm.addControl(element.controlName, new FormControl(params.get(element.controlName), { updateOn: element.updateOn , validators: element.isMandatory ? Validators.required : []}));
        frm.addControl(element.controlName2!, new FormControl(params.get(element.controlName2!), { updateOn: element.updateOn , validators: element.isMandatory ? Validators.required : []}));
      }
      else {
        frm.addControl(element.controlName, new FormControl(element.isMulti ? params.getAll(element.controlName).map(s => isNaN(+s) ? s : +s) : ((params.get(element.controlName) == 'true' ? true : params.get(element.controlName) == 'false' ? false : params.get(element.controlName))), { updateOn: element.updateOn , validators: element.isMandatory ? Validators.required : []}));
      }
    });
    return frm;
  }
  createRequestObject(
    pageIndex: number,
    pageSize: number,
    sortActive: string,
    sortDirection: 'asc' | 'desc' | '',
    searchQuery?: string,
    filterFormValue?: any | undefined ): GeneralFilterModel {
      return {
        pageIndex,
        pageSize,
        sortActive,
        sortDirection,
        searchQuery,
        ...filterFormValue
      }
  }


}
