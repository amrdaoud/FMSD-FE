export interface DataTableButton {
    text: string;
    icon?: string;
    matColor?: 'primary' | 'accent' | 'warn';
    hideWhen?: {Property: string, Value: any};
    showWhen?: {Property: string, Value: any};
    disable?: boolean;
}