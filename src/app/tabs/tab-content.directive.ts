import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tab-content]'
})
export class TabContentDirective {
  public get template() {
    return this.templateRef;
  }

  constructor(private templateRef: TemplateRef<any>) { }
}