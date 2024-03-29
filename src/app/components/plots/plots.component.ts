import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import { SealedGrapher } from '../../services/graphers/sealed';
import { PortedGrapher } from '../../services/graphers/ported';
import {Plot, Response} from '../../wubTypes';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css'],
  providers: [SealedGrapher]
})
export class PlotsComponent implements OnInit {
  radius = 5;
  xScale;
  yScaleSplThermal;
  yScalePowerMax;
  yScaleDbMagnitude;
  yScaleSplDisplacement;
  driver = {
    Name: 'poly buyout',
    Vas: 17.8,
    Qes: 1.4,
    Qms: 2.99,
    Qts: .95,
    Fs: 52,
    PEmax: 100,
    Sd: .0182,
    Xmax: 3.5
  };
  frequencyResponse;
  constructor(private sealed: SealedGrapher, private ported: PortedGrapher, private settings: SettingsService) {
      this.xScale = d3.scaleLog()
          .domain([Math.min(...this.settings.PlotPointArray), Math.max(...this.settings.PlotPointArray)])
          .range([1, 800]);
        this.yScaleSplThermal = d3.scaleLinear()
          .domain([this.settings.SplThermalLow, this.settings.SplThermalHi])
          .range([200, 1]);

        this.yScalePowerMax = d3.scaleLinear()
          .domain([this.settings.PowerMaxLow, this.settings.PowerMaxHi])
          .range([200, 1]);
        this.yScaleDbMagnitude = d3.scaleLinear()
          .domain([this.settings.DbMagnitudeLow, this.settings.DbMagnitudeHi])
          .range([200, 1]);
        this.yScaleSplDisplacement = d3.scaleLinear()
          .domain([this.settings.SplDisplacementLow, this.settings.SplDisplacementHi])
          .range([200, 1]);


      this.frequencyResponse = this.sealed.calcResponses(this.driver),
      this.frequencyResponse.push(this.ported.calcResponse(this.driver));
    this.settings.refreshChange.subscribe( data => {
      if (data === true) {
        this.settings.refresh = false;
        this.yScaleSplThermal = d3.scaleLinear()
          .domain([this.settings.SplThermalLow, this.settings.SplThermalHi])
          .range([200, 1]);
        this.yScalePowerMax = d3.scaleLinear()
          .domain([this.settings.PowerMaxLow, this.settings.PowerMaxHi])
          .range([200, 1]);
          this.yScaleDbMagnitude = d3.scaleLinear()
          .domain([this.settings.DbMagnitudeLow, this.settings.DbMagnitudeHi])
          .range([200, 1]);
        this.yScaleSplDisplacement = d3.scaleLinear()
          .domain([this.settings.SplDisplacementLow, this.settings.SplDisplacementHi])
          .range([200, 1]);
        this.drawCharts();
      }
    });
  }

  ngOnInit() {
    console.log('plots init');
  }

  clearMe(svg) {
     //  const svg = d3.select('.plotA'); // todo move this to root of component?
      svg.selectAll('*').remove();
  }

  drawCharts() {
    // TODO logic here for what chart for which spot
    const
      svgA = d3.select('.plotA'),
      svgB = d3.select('.plotB'),
      svgC = d3.select('.plotC'),
      svgD = d3.select('.plotD');

    this.drawSplPowerMax(svgA);
    this.drawSplThermal(svgB);
    this.drawDbMagnitude(svgC);
    this.drawSplDisplacement(svgD);
  }

  drawSplPowerMax(svg) {
    this.clearMe(svg);
    const
      lineFunction = d3.line<Response>()
        .x( (d: any) => this.xScale(d.F) )
        .y( (d: any) => {
         // console.log(
           // 'F:', d.F,
           // 'Fx:', this.xScale(d.F),
           // d.Pmax,
           // this.yScalePowerMax(d.Pmax),
           // d.SPLt,
           // this.yScaleSplThermal(d.SPLt),
          // );
          return this.yScalePowerMax(d.Pmax); } )
        .curve(d3.curveCardinal);

    this.frequencyResponse.forEach((plot: Plot) => {
      svg
        .append('path')
        .attr('d', lineFunction(plot.Responses))
        .attr('stroke', 'blue')
        .attr('stroke-width', 1)
        .attr('fill', 'none');
    });
    this.drawGraduationFrequencies(svg);
    this.drawSplLines(svg, this.settings.PowerMaxLow, this.settings.PowerMaxHi, this.yScalePowerMax );
  }

  drawSplThermal(svg) {
    this.clearMe(svg);
    const
      lineFunction = d3.line<Response>()
        .x( (d: any) => this.xScale(d.F) )
        .y( (d: any) => this.yScaleSplThermal(d.SPLt) )
        .curve(d3.curveCardinal);

    this.frequencyResponse.forEach((plot: Plot) => {
      svg
        .append('path')
        .attr('d', lineFunction(plot.Responses))
        .attr('stroke', 'blue')
        .attr('stroke-width', 1)
        .attr('fill', 'none');
    });
    this.drawGraduationFrequencies(svg);
    this.drawSplLines(svg, this.settings.SplThermalLow, this.settings.SplThermalHi, this.yScaleSplThermal );
  }

  drawDbMagnitude(svg) {
    this.clearMe(svg);
    const
      lineFunction = d3.line<Response>()
        .x( (d: any) => this.xScale(d.F) )
        .y( (d: any) => this.yScaleDbMagnitude(d.dBmag) )
        .curve(d3.curveCardinal);

    this.frequencyResponse.forEach((plot: Plot) => {
      svg
        .append('path')
        .attr('d', lineFunction(plot.Responses))
        .attr('stroke', 'blue')
        .attr('stroke-width', 1)
        .attr('fill', 'none');
    });
    this.drawGraduationFrequencies(svg);
    this.drawSplLines(svg, this.settings.DbMagnitudeLow, this.settings.DbMagnitudeHi, this.yScaleDbMagnitude );
  }
  drawSplDisplacement(svg) {
    this.clearMe(svg);
    const
      lineFunction = d3.line<Response>()
        .x( (d: any) => this.xScale(d.F) )
        .y( (d: any) => this.yScaleSplDisplacement(d.SPLd) )
        .curve(d3.curveCardinal);

    this.frequencyResponse.forEach((plot: Plot) => {
      svg
        .append('path')
        .attr('d', lineFunction(plot.Responses))
        .attr('stroke', 'blue')
        .attr('stroke-width', 1)
        .attr('fill', 'none');
    });
    this.drawGraduationFrequencies(svg);
    this.drawSplLines(svg, this.settings.SplDisplacementLow, this.settings.SplDisplacementHi, this.yScaleSplDisplacement );
  }

  drawGraduationFrequencies(svg) {
      const X = parseInt(svg.style('width'), 10),
      Y = parseInt(svg.style('height'), 10);
    this.settings.PlotPointArray.forEach(F => {
      svg.append('line')
        .style('stroke', 'black')
        .style('opacity', 0.1)
        .attr('x1', this.xScale(F))
        .attr('y1', 1)
        .attr('x2', this.xScale(F))
        .attr('y2', Y);
      svg.append('text')
        .attr('x', this.xScale(F))
        .attr('y', Y)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text(F);
    });
  }

  drawSplLines(svg, low, hi, yScale) {
    const jumps =  Math.min(Math.ceil((hi - low) / 10), 10);

    for (let db = low; db <= hi; db += jumps ) {
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
