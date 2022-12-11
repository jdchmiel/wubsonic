import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Driver, Box, Plot, Response} from '../wubTypes';

/*
Service to provide the array of boxes and responses used for the graphs.
Choosing a driver adds to this list.
Changing the box type changes the plot.box which shall trigger plot.response to be updated
*/

@Injectable()
export class SimulationsService {
  refresh = false;
  @Output() refreshResponses = new EventEmitter<boolean>();
  public simulations: Array<Plot>;   // Array of plots, plot is a box parameters and the freq response of the box


  constructor() { }

  doRefresh() {
    this.refresh = true;
    this.refreshResponses.emit(this.refresh);
  }

}
