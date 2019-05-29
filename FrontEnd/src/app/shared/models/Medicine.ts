import { Company } from './Company';

export class Medicine {
    name?:string;
    prospect?: Map<string,string>;
    company?: Company;
}