import { Injectable, EventEmitter, Input, Output } from '@angular/core';

@Injectable()
export class SettingsService {
  refresh = false;
  @Output() refreshChange= new EventEmitter<boolean>();

  Frequencies = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130,
       140, 150, 160, 170, 180, 190, 200, 300, 400, 800, 1000, 2000, 4000, 8000, 10000, 20000];
  Ql  = 7; // box lossiness for ported box
  Ro = 1.18;
  c = 345;
  public SplThermalLow: number;
  public SplThermalHi: number;
  public PowerMaxLow: number;
  public PowerMaxHi: number;
  public DbMagnitudeLow: number;
  public DbMagnitudeHi: number;
  public SplDisplacementLow: number;
  public SplDisplacementHi: number;

  public PlotPoints: string;
  public PlotPointArray: Array<number>;
  constructor() {
    // check if in local storage or
    // load defaults here
    this.SplThermalLow = 70;
    this.SplThermalHi = 120;
    this.PowerMaxLow = 1; //TODO convert these names to watts, not SPL
    this.PowerMaxHi = 100;
    this.DbMagnitudeLow = -20;
    this.DbMagnitudeHi = 20;
    this.SplDisplacementLow = 70;
    this.SplDisplacementHi = 120;
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
