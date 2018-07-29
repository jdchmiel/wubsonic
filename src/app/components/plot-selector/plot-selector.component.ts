import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {modal} from '../../wubTypes';

@Component({
  selector: 'app-plot-selector',
  templateUrl: './plot-selector.component.html',
  styleUrls: ['./plot-selector.component.css'],
})
export class PlotSelectorComponent implements OnInit {
  @Input() active: string;
  @Output() activeChange = new EventEmitter<modal> ( );

  plot = 'SPL';
  modal = modal;
  constructor() {
  }

  ngOnInit() {
  }
  close() {
    this.activeChange.emit(modal.none);
  }

}
