import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GraphViewerComponent } from './graph-viewer/graph-viewer.component';
import { SettingsComponent } from './settings/settings.component';
import { PlotSelectorComponent } from './plot-selector/plot-selector.component';
import { DriverSelectorComponent } from './driver-selector/driver-selector.component';
import { BoxStyleSelectorComponent } from './box-style-selector/box-style-selector.component';
import { NextActionComponent } from './next-action/next-action.component';
import { PlotsComponent } from './plots/plots.component';


@NgModule({
  declarations: [
    AppComponent,
    GraphViewerComponent,
    SettingsComponent,
    PlotSelectorComponent,
    DriverSelectorComponent,
    BoxStyleSelectorComponent,
    NextActionComponent,
    PlotsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
