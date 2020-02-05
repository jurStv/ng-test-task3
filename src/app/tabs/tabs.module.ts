import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabComponent } from './tab/tab.component';
import { TabTitleComponent } from './tab-title/tab-title.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { TabContentDirective } from './tab-content.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TabComponent, TabTitleComponent, TabsContainerComponent, TabContentDirective],
  exports: [TabComponent, TabTitleComponent, TabContentDirective, TabsContainerComponent],
})
export class TabsModule { }