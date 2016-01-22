/** @babel */
import {ComponentRegistry, PreferencesUIStore} from 'nylas-exports';
import WeatherSidebar from './weather-sidebar';
import WeatherPreferences from './weather-preferences';

export function activate() {
  this.tab = new PreferencesUIStore.TabItem({
    tabId: 'Weather',
    displayName: 'Weather',
    component: WeatherPreferences,
  });
  PreferencesUIStore.registerPreferencesTab(this.tab);
  ComponentRegistry.register(WeatherSidebar, {role: 'MessageListSidebar:ContactCard'});
}    

export function deactivate() {
  PreferencesUIStore.unregisterPreferencesTab(this.tab);
  ComponentRegistry.unregister(WeatherSidebar);
}
