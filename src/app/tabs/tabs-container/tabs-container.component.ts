import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { map, startWith, pairwise, partition, filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { TabComponent } from '../tab/tab.component';
import { TABS_CONTEXT_TOKEN, ITabsContext } from '../tabs.model';

@Component({
  selector: 'tabs',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css'],
  providers: [{ provide: TABS_CONTEXT_TOKEN, useExisting: TabsContainerComponent }],
})
export class TabsContainerComponent implements AfterViewInit, OnDestroy, ITabsContext {
  private subscriptions: Subscription[] = [];
  @ContentChildren(TabComponent) private tabs: QueryList<TabComponent>;

  private get tabsArr() {
    return this.tabs.toArray();
  }

  public get titles() {
    return this.tabsArr.map((tab: TabComponent) => tab.titleTemplate);
  }

  public content: TemplateRef<any>;

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    // stream of tabs number change
    const firstTab$ = this.tabs.changes.pipe(
      startWith(this.tabs.length),
      map((tabs: QueryList<TabComponent>) => tabs.length),
      pairwise(),
      map(([a, b]) => a - b),
      filter((diff) => diff !== 0),
       // find out if there is any active tab right now
      map(() => this.tabsArr.some((tab: TabComponent) => tab.active)),
      // continue only if there is no active tabs right now
      filter((hasActiveTab) => !hasActiveTab),
      map(() => this.tabs.first),
    );
    // two streams splitted by existance of any tabs in there
    const [tabsExist$, empty$] = partition<TabComponent>(Boolean)(firstTab$);

    this.subscriptions.push(
      tabsExist$.pipe(tap((tab: TabComponent) => tab.activate())).subscribe()
    );
    this.subscriptions.push(
      empty$.pipe(tap(() => this.clearContent())).subscribe()
    );

    // initial first tab activation
    const firstTab = this.tabs.first;
    if (firstTab) {
      firstTab.activate();
    }
  }

  ngOnDestroy() {
    // normally would use untilComponentDestroy pipe operator 
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private clearContent() {
      this.content = null;
  }

  public renderTabTemplate(templateRef) {
    this.content = templateRef;
    this.cd.detectChanges();
  }

  public clearCurrentActive() {
    const currentActiveTab = this.tabsArr.find((tab: TabComponent) => tab.active);
    if (currentActiveTab) {
      this.clearContent();
      currentActiveTab.deactivate();
    }
  }
}