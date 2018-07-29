import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {modal} from '../../wubTypes';

@Component({
  selector: 'app-box-style-selector',
  templateUrl: './box-style-selector.component.html',
  styleUrls: ['./box-style-selector.component.css']
})
export class BoxStyleSelectorComponent implements OnInit {
  @Input() active: string;
  @Output() activeChange = new EventEmitter<modal>();

  constructor() { }

  ngOnInit() {
  }
  close() {
    this.activeChange.emit(modal.none);
  }

}
