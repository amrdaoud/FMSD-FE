export interface AlarmListViewModel {
    id: number;
    alarmType: string;
    alarmCode: string;
    description: string;
    status: string;
    acknowledgeUser: string;
    alarmTime: Date | null;
    inactiveTime: Date | null;
    acknowledgeTime: Date | null;
}