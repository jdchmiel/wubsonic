import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SealedGrapher, Plot, Response } from '../graphers/sealed';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css']
})
export class PlotsComponent implements OnInit {
  radius = 5;
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
      svg = d3.select('.plotA'),
      X = parseInt(svg.style('width'), 10),
      Y = parseInt(svg.style('height'), 10),
      zoom = 3,
      // Set up scales
      xScale = d3.scaleLog()
        .domain([1, 20000])
        .range([1, 800]),
      yScale = d3.scaleLinear()
        .domain([40, 120])
        .range([200, 1]),
      frequencyResponse = this.sealed.calcResponses(driver),
      lineFunction = d3.line<Response>()
        .x(function (d: any) { return xScale(d.F); })
        .y(function (d: any) { console.log(xScale(d.F), yScale(d.SPLt)); return yScale(d.SPLt  );  })
        .curve(d3.curveCardinal);

    frequencyResponse.forEach((plot: Plot) => {
      svg
        .append('path')
        .attr('d', lineFunction(plot.Responses))
        .attr('stroke', 'blue')
        .attr('stroke-width', 1)
        .attr('fill', 'none');
    });
    [10, 20, 30, 40,  60, 80,  100, 200, 300, 400].forEach(F => {
      svg.append('line')
        .style('stroke', 'black')
        .style('opacity', 0.1)
        .attr('x1', xScale(F))
        .attr('y1', 1)
        .attr('x2', xScale(F))
        .attr('y2', Y);
      svg.append('text')
        .attr('x', xScale(F))
        .attr('y', Y)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text(F);
    });

    for (let db = 40; db <= 120; db += 5 ) {
      svg.append('line')
        .style('stroke', 'black')
        .style('opacity', 0.1)
        .attr('x1', 0)
        .attr('y1', yScale(db))
        .attr('x2', 9999)
        .attr('y2', yScale(db));
      svg.append('text')
        .attr('x', 10)
        .attr('y', yScale(db))
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text(db);

    }


  }
}
