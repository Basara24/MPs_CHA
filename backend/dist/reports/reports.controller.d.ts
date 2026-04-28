import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    vendasCsv(): Promise<string>;
    inadimplenciaCsv(): Promise<string>;
}
