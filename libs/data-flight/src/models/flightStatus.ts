
export enum FlightStatus {
    onTime = 'On Time',
    delayed = 'Delayed',
    cancelled = 'Cancelled'
}

export class FlightData {
    id!: number;
    from!: string;
    to!: string;
    status?: FlightStatus;
    date!: string | number
}