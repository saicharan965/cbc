import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTableColComponent } from './ui-table-col/ui-table-col.component';
import { UiTableFilterItemComponent } from './ui-table-filter-item/ui-table-filter-item.component';
import { UiTableFilterComponent } from './ui-table-filter/ui-table-filter.component';
import { UiTableComponent } from './ui-table/ui-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    UiTableColComponent,
    UiTableFilterItemComponent,
    UiTableFilterComponent,
    UiTableComponent
  ],
  exports: [
    UiTableColComponent,
    UiTableFilterItemComponent,
    UiTableFilterComponent,
    UiTableComponent
  ],
})
export class UiTableModule { }
