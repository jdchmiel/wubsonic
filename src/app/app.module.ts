import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PlotSelectorComponent } from './components/plot-selector/plot-selector.component';
import { DriverSelectorComponent } from './components/driver-selector/driver-selector.component';
import { BoxStyleSelectorComponent } from './components/box-style-selector/box-style-selector.component';
import { NextActionComponent } from './components/next-action/next-action.component';
import { PlotsComponent } from './components/plots/plots.component';
import { SealedGrapher } from './services/graphers/sealed';
import { SettingsService } from './services/settings.service';
import { PortedGrapher } from './services/graphers/ported';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    PlotSelectorComponent,
    DriverSelectorComponent,
    BoxStyleSelectorComponent,
    NextActionComponent,
    PlotsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    SealedGrapher,
    PortedGrapher,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

