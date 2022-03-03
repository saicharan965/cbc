import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'cbc-ui-table-col',
  templateUrl: './ui-table-col.component.html',
  styleUrls: ['./ui-table-col.component.scss']
})
export class UiTableColComponent implements OnInit {
  @Input() displayName!: string ;
  @Input() name!: string;
  @ContentChild(TemplateRef) template!: TemplateRef<any> | null;
  constructor() { }

  ngOnInit(): void {
  }

}
