import { Criteria } from 'libs/criteria.model';
import { FlightStatus } from './flightStatus';

export class SearchFlightRequest extends Criteria {
    status: FlightStatus[] = []
    startDate!: Date
    endDate!: Date
}