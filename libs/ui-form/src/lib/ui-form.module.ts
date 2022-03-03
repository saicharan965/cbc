import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormControlHolderComponent } from './form-control-holder/form-control-holder.component';
import { FormControlErrorComponent } from './form-control-error/form-control-error.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    
    FormComponent,
    FormControlHolderComponent,
    FormControlErrorComponent
  ],
  exports: [
    FormComponent,
    FormControlHolderComponent,
    FormControlErrorComponent
  ],
})
export class UiFormModule {}
