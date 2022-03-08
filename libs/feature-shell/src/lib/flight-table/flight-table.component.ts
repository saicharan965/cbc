import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlightStatus, SearchFlightRequest, FlightData, FlightDataService } from '@cbc/data-flight';
import { TableConfig } from '@cbc/ui-table';
import { of } from 'rxjs';

@Component({
  selector: 'cbc-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.scss']
})
export class FlightTableComponent implements OnInit {
  statusArray = [FlightStatus.onTime, FlightStatus.delayed, FlightStatus.cancelled];
  tableConfig?: TableConfig<SearchFlightRequest, FlightData>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private flightDataService: FlightDataService) { }
  ngOnInit(): void {
    this.tableConfig = new TableConfig<any, any>({
      criteria: new SearchFlightRequest,
      search: (criteria) => this.Search(criteria),
      details: (flight) => this.router.navigate([flight.id, { returnUrl: this.router.url }], { relativeTo: this.activatedRoute })
    })
  }

  onChange(criteria: SearchFlightRequest, state: FlightStatus, event?: Event) {
    const index = criteria.status.indexOf(state);
    if ((<HTMLInputElement>event?.target).checked) {
      criteria.status.push(state);
    } else {
      criteria.status.splice(index, 1);
    }
  }

  Search(criteria: SearchFlightRequest) {
    let filteredFlightData = this.flightDataService.flghtData;
    if (criteria) {
      const startDate = criteria.startDate
      const endDate = criteria.endDate
      const searchTerm = criteria.searchTerm;
      if (startDate) {
        filteredFlightData = filteredFlightData.filter(x => new Date(startDate) <= new Date(x.date))
      }
      if (endDate) {
        filteredFlightData = filteredFlightData.filter(x => new Date(endDate) >= new Date(x.date))
      }
      if (searchTerm) {
        filteredFlightData = filteredFlightData.filter(x => x.id.toString().toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1)
      }
      if (criteria?.status?.length) {
        filteredFlightData = filteredFlightData.filter(x => {
          if (x.status) {
            const bool = criteria.status.indexOf(x?.status) !== -1;

            return bool;
          }
          else return false
        });
      }
    }
    return of(filteredFlightData)
  }
}
