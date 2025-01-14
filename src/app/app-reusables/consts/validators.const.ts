import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class MYVALIDATORS {
    static dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        if(!control.get('startDate')?.value && !control.get('endDate')?.value) {
            return null;
        }
        else if(!control.get('endDate')?.value) {
            return {endDateRequired: true}
        }
        return control.get('endDate')?.value > control.get('startDate')?.value ? null : {dateRange: true}
    }
}