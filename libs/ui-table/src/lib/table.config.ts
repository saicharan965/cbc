import { Observable } from 'rxjs';
import { Criteria } from 'libs/criteria.model'
export class TableConfig<TCriteria extends Criteria, TType> {
    search: (criteria: TCriteria) => Observable<TType[]>;
    criteria?: TCriteria;
    details?: (entity: TType) => any;

    constructor(data: {
        criteria?: TCriteria,
        search: (criteria: TCriteria) => Observable<TType[]>,
        details?: (entity: TType) => any
    }) {

        this.criteria = data.criteria ?? <TCriteria>{};
        this.search = data.search,
            this.details = data.details;
    }
}