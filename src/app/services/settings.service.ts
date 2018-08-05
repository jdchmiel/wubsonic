import { Injectable, EventEmitter, Input, Output } from '@angular/core';

@Injectable()
export class SettingsService {
  refresh = false;
  @Output() refreshChange= new EventEmitter<boolean>();

  public SplThermalLow: number;
  public SplThermalHi: number;
  public SplPowerMaxLow: number;
  public SplPowerMaxHi: number;

  public PlotPoints: string;
  public PlotPointArray: Array<number>;
  constructor() {
    // check if in local storage or
    // load defaults here
    this.SplThermalLow = 70;
    this.SplThermalHi = 120;
    this.SplPowerMaxLow = 1;
    this.SplPowerMaxHi = 100;
    this.PlotPoints = '1,10,20,30,40,60,80,100,200,300,400,20000';
    this.PlotPointArray = [];
    this.PlotPoints.match(/[0-9]+/g).forEach(point => {
      this.PlotPointArray.push(parseInt(point, 10));
    });
  }

  doRefresh() {
    this.refresh = true;
    this.refreshChange.emit(this.refresh);
  }

  changePlotPoints() {
    this.PlotPointArray = [];
    this.PlotPoints.match(/[0-9]+/g).forEach(point => {
      this.PlotPointArray.push(parseInt(point, 10));
    });
    this.doRefresh();
  }



}
