import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
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
  standalone: false,
})
export class FlightDetailsComponent implements OnInit {
  config!: FormConfig<FlightData>;
  flightStatus = FlightStatus;
  invalidFlightId!: boolean;
  flightId = new UntypedFormControl();
  constructor(private _flightDataService: FlightDataService) { }

  ngOnInit(): void {
    this.config = FormConfig.create<FlightData>({
      form: new UntypedFormGroup({
        id: new UntypedFormControl('', [Validators.required]),
        from: new UntypedFormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
          this.customValidator(),
        ]),
        to: new UntypedFormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
          this.customValidator(),
        ]),
        status: new UntypedFormControl(),
        date: new UntypedFormControl(),
      }),
      load: (id: number) => this._flightDataService.GetById(id),
      create: (flight) => this._flightDataService.create(flight),
      update: (flight) => this._flightDataService.update(flight),
    });
  }
  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isInvalid = control.value === 'BLACKBOX';
      return isInvalid ? { randomErrorId: { value: control.value } } : null;
    };
  }
}
