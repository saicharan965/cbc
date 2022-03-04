import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FlightData, FlightDataService, FlightStatus } from '@cbc/data-flight';
import { FormConfig } from 'libs/ui-form/src/lib/form.config';

@Component({
  selector: 'cbc-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent implements OnInit {
  config!: FormConfig<FlightData>;
  flightStatus = FlightStatus;
  invalidFlightId!: boolean;
  flightId = new FormControl();
  constructor(private _flightDataService: FlightDataService) {}

  ngOnInit(): void {
    this.config = FormConfig.create<FlightData>({
      form: new FormGroup({
        id: new FormControl(''),
        from: new FormControl('', [
          Validators.required,
          Validators.maxLength(7),
          this.customValidator(),
        ]),
        to: new FormControl('', [
          Validators.required,
          Validators.maxLength(7),
          this.customValidator(),
        ]),
        status: new FormControl(),
        date: new FormControl(),
      }),
      load: (id: number) => this._flightDataService.GetById(id),
      create: (flight) => this._flightDataService.create(flight),
      update: (flight) => this._flightDataService.update(flight),
    });
    console.log(this.config);
  }
  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isInvalid = control.value === 'BLACKBOX';
      return isInvalid ? { randomErrorId: { value: control.value } } : null;
    };
  }
}
