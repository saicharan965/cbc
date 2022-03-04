import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { ControlContainer, FormGroupDirective, NgControl } from '@angular/forms';
import { FormControlErrorComponent } from '../form-control-error/form-control-error.component';

@Component({
  selector: 'cbc-form-control-holder',
  templateUrl: './form-control-holder.component.html',
  styleUrls: ['./form-control-holder.component.scss'],
  providers: [{ provide: ControlContainer, useExisting: FormGroupDirective}]

})
export class FormControlHolderComponent implements AfterContentInit {
  @ContentChild(NgControl) control!: NgControl;
  @ContentChildren(FormControlErrorComponent)
  errorDefinitions!: QueryList<FormControlErrorComponent>;
  @Input() label!: string;
  name!: string;
  required!: boolean;
  minLengthError!: { requiredLength: number; actualLength: number } | null;
  maxLengthError!: { requiredLength: number; actualLength: number } | null;
  minError!: number;
  maxError!: number;
  emailError!: boolean;
  activeErrors: string[] = [];
  ngAfterContentInit(): void {
    debugger;
    this.name = `${this.control.name}`;
    this.control.valueChanges?.subscribe(() => this.updateErrors());
  }
  updateErrors(): void {
    this.required = this.control.hasError('required');
    this.emailError = this.control.hasError('email');
    this.setLengthError('minlength', (error) => (this.minLengthError = error));
    this.setLengthError('maxlength', (error) => (this.maxLengthError = error));
    this.setValueError('min', (value) => (this.minError = value));
    this.setValueError('max', (value) => (this.maxError = value));

    if (this.errorDefinitions?.length) {
      debugger;
      this.activeErrors.splice(0, this.activeErrors.length);
      this.errorDefinitions.forEach((errorDefinition) => {
        if (errorDefinition.id && errorDefinition.error) {
          const hasError = this.control.hasError(errorDefinition.id);
          if (hasError) {
            this.activeErrors.push(errorDefinition.error);
          }
        }
      });
    }
  }

  setLengthError(
    errorName: string,
    value: (
      errorValue: { requiredLength: number; actualLength: number } | null
    ) => void
  ) {
    debugger;
    const error = this.control.getError(errorName);
    if (error) {
      value({
        requiredLength: error.requiredLength,
        actualLength: error.actualLength,
      });
    } else {
      value(null);
    }
  }

  setValueError(errorName: string, value: (value: number) => void) {
    debugger;
    const error = this.control.getError(errorName);
    value(error ? error[errorName] : null);
  }
}
