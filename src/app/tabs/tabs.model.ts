import { InjectionToken } from '@angular/core';

export const TABS_CONTEXT_TOKEN = new InjectionToken('TabsContextToken');
export interface ITabsContext {
  renderTabTemplate(templRef): void;
  clearCurrentActive(): void;
}

export const TAB_CONTEXT_TOKEN = new InjectionToken('TabsContextToken');
export interface ITabContext {
  active: boolean;
}