import { CompanyInterface } from './company-interface';

export interface FirmApiInterface {
    nhits: number;
    parameters: {};
    records: CompanyInterface[];
    facet_groups: {};
}
