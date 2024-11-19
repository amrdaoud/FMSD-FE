import { Signal } from "@angular/core";
import { Observable } from "rxjs";

export interface DataTableFilter {
    label?: string;
    placeHolder?: string;
    data$?: Observable<any[]>;
    controlName: string;
    valueProperty?: string;
    displayProperty?: string;
    isLoading?: Signal<boolean>;
    isMulti?: boolean;
    type?: 'select'|'radio'|'input'|'twoDates'|'date'|'slider'|'checkbox'|'autoComplete';
    updateOn?: 'change' | 'blur' | 'submit';
    isMandatory?: boolean;
    controlName2?: string;
    label2?: string;
    placeHolder2?: string;
    minValue?: number;
    maxValue?: number;
    control1InitialValue?: any,
    control2InitialValue?: any
}