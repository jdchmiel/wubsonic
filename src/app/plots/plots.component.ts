import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {SealedGrapher} from '../graphers/sealed';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css']
})
export class PlotsComponent implements OnInit {
  radius  = 5;
  sealed = new SealedGrapher();

  constructor() { }

  ngOnInit() {
  }

  clickPressMe() {
    const driver = {
      Name: 'poly buyout',
      Vas: 17.8,
      Qes: 1.4,
      Qms: 2.99,
      Qts: .95,
      Fs: 52,
      PEmax: 100,
      Sd: .0780,
      Xmax: 3.5
    },
    svg = d3.select('.mySvg'),

    frequencyResponse = this.sealed.calcResponses(driver),
    lineFunction = d3.line()
      .x(function(d) { return d.F * 3; } )
      .y(function(d) { return 400 - Math.round(d.SPLt * 3); } )
      .curve(d3.curveCardinal);

      frequencyResponse.forEach( plot => {
        svg
          .append('path')
          .attr('d', lineFunction(plot.Responses))
         .attr('stroke', 'blue')
         .attr('stroke-width', 1)
         .attr('fill', 'none');
      });
    }
}
