export interface GeneralFilterModel {
    searchQuery?: string;
    pageIndex: number;
    pageSize: number;
    sortActive: string;
    sortDirection: 'asc' | 'desc';
}