import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { of, delay, Observable } from 'rxjs';
import { FlightData, FlightStatus } from '../models/flightStatus';

@Injectable({
  providedIn: 'root'
})
export class FlightDataService {
  date: Date = new Date()
  flghtData: FlightData[] = [
    {
      id: 1,
      from: 'Visakapatnam',
      to: 'Mallorca',
      date: formatDate(this.date.setDate(this.date.getDate() + 1), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.onTime
    },
    {
      id: 2,
      from: 'Washington',
      to: 'Barcelona',
      date: formatDate(this.date.setDate(this.date.getDate()), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.delayed
    },
    {
      id: 3,
      from: 'Mallorca',
      to: 'Ibiza',
      date: formatDate(this.date.setDate(this.date.getDate() + 1), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.onTime

    },
    {
      id: 4,
      from: 'Visakapatnam',
      to: 'Tirupathi',
      date: formatDate(this.date.setDate(this.date.getDate()), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.cancelled
    },
    {
      id: 5,
      from: 'Delhi',
      to: 'Visakapatnam',
      date: formatDate(this.date.setDate(this.date.getDate() - 2), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.delayed

    },
    {
      id: 6,
      from: 'Barcelona',
      to: 'Chennai',
      date: formatDate(this.date.setDate(this.date.getDate() + 3), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.cancelled

    },
    {
      id: 7,
      from: 'Delhi',
      to: 'Singapore',
      date: formatDate(this.date.setDate(this.date.getDate()), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.delayed

    },
    {
      id: 8,
      from: 'Delhi',
      to: 'Washington',
      date: formatDate(this.date.setDate(this.date.getDate() - 2), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.onTime
    },
    {
      id: 9,
      from: 'Paris',
      to: 'New york',
      date: formatDate(this.date.setDate(this.date.getDate() + 1), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.cancelled
    },
    {
      id: 10,
      from: 'Barcelona',
      to: 'Paris',
      date: formatDate(this.date.setDate(this.date.getDate()), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.cancelled
    },
    {
      id: 11,
      from: 'Chennai',
      to: 'Delhi',
      date: formatDate(this.date.setDate(this.date.getDate() + 1), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.delayed
    },
    {
      id: 12,
      from: 'Chennai',
      to: 'Tokyo',
      date: formatDate(this.date.setDate(this.date.getDate()), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.onTime
    },
    {
      id: 13,
      from: 'New york',
      to: 'Mumbai',
      date: formatDate(this.date.setDate(this.date.getDate() - 3), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.cancelled
    },
    {
      id: 14,
      from: 'Tokyo',
      to: 'Kolkata',
      date: formatDate(this.date.setDate(this.date.getDate() + 5), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.cancelled
    },
    {
      id: 15,
      from: 'Shimla',
      to: 'Dhaka',
      date: formatDate(this.date.setDate(this.date.getDate() - 1), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.delayed
    },
    {
      id: 16,
      from: 'Tokyo',
      to: 'Shimla',
      date: formatDate(this.date.setDate(this.date.getDate() + 1), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.onTime
    },
    {
      id: 17,
      from: 'Dhaka',
      to: 'Ahmedabad',
      date: formatDate(this.date.setDate(this.date.getDate() - 3), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.cancelled
    },
    {
      id: 18,
      from: 'Ahmedabad',
      to: 'Ibiza',
      date: formatDate(this.date.setDate(this.date.getDate() - 1), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.delayed
    },
    {
      id: 19,
      from: 'Delhi',
      to: 'Mumbai',
      date: formatDate(this.date.setDate(this.date.getDate() + 2), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.onTime
    },
    {
      id: 20,
      from: 'Singapore',
      to: 'Delhi',
      date: formatDate(this.date.setDate(this.date.getDate() + 1), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.delayed
    },
    {
      id: 21,
      from: 'Delhi',
      to: 'Singapore',
      date: formatDate(this.date.setDate(this.date.getDate() - 4), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.delayed
    },
    {
      id: 22,
      from: 'Dhaka',
      to: 'Shimla',
      date: formatDate(this.date.setDate(this.date.getDate() + 4), 'yyyy-MM-dd', 'en-US'),
      status: FlightStatus.onTime
    },
  ]

  constructor() { }

  GetById(id: number) {
    debugger;
    const index = this.findIndex(id);
    return of(this.flghtData[index]).pipe(delay(500));

  }

  update(flight: FlightData): Observable<FlightData> {
    const index = this.findIndex(flight.id);
    this.flghtData[index] = flight;
    return of(this.flghtData[index]).pipe(delay(1000));;
  }

  create(flight: FlightData): Observable<FlightData> {
    debugger
    const flightWithHighestId = this.flghtData.reduce(function (prev, current) {
      return (prev.id > current.id) ? prev : current
    })
    flight.id = flightWithHighestId.id + 1;
    this.flghtData.push(flight);
    return of(flight).pipe(delay(1000));
  }

  private findIndex = (id: number) => this.flghtData.findIndex(x => x.id == id);

}
