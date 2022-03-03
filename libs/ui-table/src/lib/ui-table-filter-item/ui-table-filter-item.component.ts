import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'cbc-ui-table-filter-item',
  templateUrl: './ui-table-filter-item.component.html',
  styleUrls: ['./ui-table-filter-item.component.scss']
})
export class UiTableFilterItemComponent implements OnInit {
  @Input() name!: string;
  @ContentChild(TemplateRef) template!: TemplateRef<any>
  constructor() { }

  ngOnInit(): void {
  }

}
