import { Component, OnInit, Inject, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';

import { TAB_CONTEXT_TOKEN, ITabContext } from '../tabs.model';

@Component({
  selector: 'tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.css']
})
export class TabTitleComponent implements OnInit {
  @ViewChild('titleTemplate', { static: true }) private templateRef: TemplateRef<any>;
  get modifierClassActive() { return this.ctx.active; }
  
  @Output() public trigger = new EventEmitter<void>(); 
  public get template() {
    return this.templateRef;
  }

  constructor(@Inject(TAB_CONTEXT_TOKEN) private ctx: ITabContext) { }

  public handleClick() {
    this.trigger.emit();
  }

  ngOnInit() {}
}