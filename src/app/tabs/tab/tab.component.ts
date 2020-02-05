import { Component, OnInit, OnDestroy, ContentChild, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { TabTitleComponent } from '../tab-title/tab-title.component';
import { TabContentDirective } from '../tab-content.directive';
import { TABS_CONTEXT_TOKEN, ITabsContext, TAB_CONTEXT_TOKEN, ITabContext } from '../tabs.model';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  providers: [{ provide: TAB_CONTEXT_TOKEN, useExisting: TabComponent }],
})
export class TabComponent implements OnInit, OnDestroy, ITabContext {
  private isActive = false;
  private subscription: Subscription;
  @ContentChild(TabTitleComponent, { static: true }) private title: TabTitleComponent;
  @ContentChild(TabContentDirective, { static: true }) private content: TabContentDirective; 
  
  public get titleTemplate() {
    return this.title.template;
  }

  public get contentTemplate() {
    return this.content.template;
  }

  public get active() {
    return this.isActive;
  }

  constructor(@Inject(TABS_CONTEXT_TOKEN) private ctx: ITabsContext) {}

  ngOnInit() {
    this.subscription = this.title.trigger.subscribe(() => this.activate());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public activate() {
    if (this.isActive) {
      return;
    }
    this.ctx.clearCurrentActive();
    this.isActive = true;
    this.ctx.renderTabTemplate(this.contentTemplate);
  }

  public deactivate() {
    this.isActive = false;
  }
}