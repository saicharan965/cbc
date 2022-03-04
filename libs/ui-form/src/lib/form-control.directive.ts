import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[formControlName], [formControl], [ngModel]'
})
export class FormControlDirective implements OnDestroy, AfterViewInit {
  subscription: Subscription | undefined;

  constructor(private el: ElementRef, private control: NgControl, private renderer: Renderer2) { }

  ngAfterViewInit(): void{
    debugger;
      this.subscription = this.control.valueChanges?.subscribe(() => {
      const action = this.control.valid ? this.renderer.removeClass : this.renderer.addClass;
      const className = 'is-invalid';
      action(this.el.nativeElement, className); 
    })
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
