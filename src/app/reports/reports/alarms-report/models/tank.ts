export interface Tank {
    guid: string;
    id: number | null;
    tankName: string;
    stationGuid: string;
    dLLimit: number;
    wLLimit: number;
    mLLimit: number;
    lowLimit: number;
    lowLowLimit: number;
    highLimit: number;
    highHighLimit: number;
    hysteresis: number;
    waterHighLimit: number;
    logicalAddress: number;
    physicalAddress: number;
    height: number;
    description: string | null;
    capacity: number;
    createdAt: string | null;
    updatedAt: string | null;
    tankStatusId: number | null;
    tankStatus: string;
    stationName: string;
    city: string;
}