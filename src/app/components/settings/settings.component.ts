import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {modal} from '../../wubTypes';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Input() active: string;
  @Output() activeChange = new EventEmitter<modal>();
  constructor(public settings: SettingsService) {
  }
  ngOnInit() {
  }
  close() {
    this.activeChange.emit(modal.none);
  }
  doRefresh() {
    this.settings.doRefresh();
  }
  changePlotPoints() {
    this.settings.changePlotPoints();
  }

}
