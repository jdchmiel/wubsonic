import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {modal} from '../../wubTypes';

@Component({
  selector: 'app-driver-selector',
  templateUrl: './driver-selector.component.html',
  styleUrls: ['./driver-selector.component.css']
})
export class DriverSelectorComponent implements OnInit {
  @Input() active: string;
  @Output() activeChange = new EventEmitter<modal>();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.activeChange.emit(modal.none);
  }

}
