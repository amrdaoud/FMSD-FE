export interface CalibrationDetailListViewModel
{
    id : number;
    tankName : string;
    fuelBefore : number;
    fuelAfter : number;
    tcvBefore : number;
    tcvAfter : number;
    startedOn : Date;
    endedOn : Date;
}