export interface PageParam {
    current: number;
    pagesize: number;
}

export interface PageResult {
    total: number;
    record: any[];
}