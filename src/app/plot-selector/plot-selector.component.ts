import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plot-selector',
  templateUrl: './plot-selector.component.html',
  styleUrls: ['./plot-selector.component.css']
})
export class PlotSelectorComponent implements OnInit {

  plot = 'SPL';
  constructor() { }

  ngOnInit() {
  }

}
