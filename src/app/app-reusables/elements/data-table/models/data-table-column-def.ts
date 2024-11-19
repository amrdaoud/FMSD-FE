import { Highlight } from '../../../models/highlight';
export interface DataTableColumnDef {
    name: string;
    property: string;
    isSort?: boolean;
    pipe?: any;
    pipeArgs?: string;
    highlights?: Highlight[];
    isImage?: boolean;
    hideHandset?: boolean;
    haveFooter?: boolean;
    footerName?: string;
    footerPipe?: any;
    footerPipeArgs?: string;
    tooltip?: string;
}