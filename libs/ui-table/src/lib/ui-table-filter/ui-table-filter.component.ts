import { Component, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { UiTableFilterItemComponent } from '../ui-table-filter-item/ui-table-filter-item.component';

@Component({
  selector: 'cbc-ui-table-filter',
  templateUrl: './ui-table-filter.component.html',
  styleUrls: ['./ui-table-filter.component.scss']
})
export class UiTableFilterComponent {
  @Input() filterItems!: QueryList<UiTableFilterItemComponent>;
  @Input() criteria: any;
  @Output() criteriaChange = new EventEmitter();
  @Output() reset = new EventEmitter();
  @Input() originalCriteria: any;
  usedFilterItems!: number;


  constructor() {}

  resetFilter() {
    this.reset.next(undefined);
    this.updateUsedFilterItems();
  }
  onChange() {
    this.criteriaChange.next(this.criteria)
    this.updateUsedFilterItems()
    if (this.criteria.searchTerm == "") {
      this.usedFilterItems = this.usedFilterItems - 1
    }
    if (this.criteria.date == "") {
      debugger
      this.usedFilterItems = this.usedFilterItems - 1
    }
  }

  private updateUsedFilterItems(): void {
    const keys = [...new Set(Object.keys(this.originalCriteria).concat(Object.keys(this.criteria)))]
    this.usedFilterItems = keys
      .filter(key => JSON.stringify(this.originalCriteria[key]) !== JSON.stringify(this.criteria[key])).length;
  }

}
