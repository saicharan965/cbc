import { RouterModule, Routes } from '@angular/router';
import { UiTableModule } from '@cbc/ui-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightTableComponent } from './flight-table/flight-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { UiFormModule } from '@cbc/ui-form';

const ROUTES: Routes = [
  {path:'', redirectTo:'viewFlights', pathMatch:'full'},
  { path: 'viewFlights', component: FlightTableComponent },
  { path: 'viewFlights/:id', component: FlightDetailsComponent }
]


@NgModule({
  imports: [
    CommonModule,
    UiTableModule,
    FormsModule,
    ReactiveFormsModule,
    UiFormModule,
    RouterModule.forChild(ROUTES)],
  declarations: [
    FlightTableComponent,
    FlightDetailsComponent
  ],
  exports: [
    FlightTableComponent,
    FlightDetailsComponent
  ],
})
export class FeatureShellModule { }
