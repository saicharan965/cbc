import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cbc-form-control-error',
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.scss']
})
export class FormControlErrorComponent implements OnInit {
 
 @Input() id?:string;
 @Input() error?:string
  ngOnInit(): void {
  }

}
