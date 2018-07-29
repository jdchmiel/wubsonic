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

  constructor(private settings: SettingsService) {
    console.log('settings constructor');
  }
  ngOnInit() {
  }
  close() {
    console.log('settings close ation');
    this.activeChange.emit(modal.none);
  }
  doRefresh() {
    console.log('refresh');
    this.settings.doRefresh();
  }

}
