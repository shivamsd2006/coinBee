export interface budgetBody {
    Amount: number;
    Description?: string;
    CategoryId?: number | string;
    StartDate: string | number | Date;
    EndDate: string | number | Date;
}
