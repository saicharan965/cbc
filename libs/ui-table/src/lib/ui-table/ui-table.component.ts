import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { DeepCloneService } from '../deep-clone.service';
import { TableConfig } from '../table.config';
import { UiTableColComponent } from '../ui-table-col/ui-table-col.component';
import { UiTableFilterItemComponent } from '../ui-table-filter-item/ui-table-filter-item.component';

@Component({
  selector: 'cbc-ui-table',
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss']
})
export class UiTableComponent implements OnInit {
  @Input() tableConfig?: TableConfig<any, any>
  @ContentChildren(UiTableColComponent) cols!: QueryList<UiTableColComponent>;
  @ContentChildren(UiTableFilterItemComponent) filterItems!: QueryList<UiTableFilterItemComponent>;
  criteria: any;
  records!: any[];
  loading!: boolean;
  details!: boolean;
  originalCriteriaValue: any;
  subscription!: Subscription;
  constructor(
    private deepCloneService: DeepCloneService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.SetCriteria();
    this.Search();
  }

  SetCriteria() {
    this.originalCriteriaValue = this.deepCloneService.clone(this.tableConfig?.criteria);
    this.details = this.tableConfig?.details != null;
    const criteria = this.activatedRoute.snapshot.queryParamMap.get('criteria');
    if (criteria) {
      this.criteria = JSON.parse(atob(criteria));
    } else {
      this.criteria = this.deepCloneService.clone(this.tableConfig?.criteria);
    }
  }

  ngAfterContentInit(): void {
    this.loading = true;
  }
  Search() {
    this.loading = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.tableConfig)
      this.subscription = this.tableConfig.search(this.criteria)
        .pipe(finalize(() => this.loading = true))
        .subscribe((result) => this.records = result)
  }

  onCriteriaChange() {
    if (this.criteria.searchTerm == "") this.changeUrl(this.criteria)

    this.changeUrl(btoa(JSON.stringify(this.criteria)));
    this.Search();

  }

  resetFilter() {
    debugger;
    Object.keys(this.criteria).forEach(key => {
      this.criteria[key] = this.deepCloneService.clone(this.originalCriteriaValue[key]);
    })
    this.changeUrl(undefined);
    this.Search();
  }

  changeUrl(criteria?: string) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { criteria: criteria },
        queryParamsHandling: 'merge',
      });
  }
  onDetails(record: any) {
    if (this.tableConfig?.details) {
      this.tableConfig.details(record);
    }
  }
}
