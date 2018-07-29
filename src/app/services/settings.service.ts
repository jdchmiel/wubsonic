import { Injectable, EventEmitter, Input, Output } from '@angular/core';

@Injectable()
export class SettingsService {
  refresh = false;
  @Output() refreshChange= new EventEmitter<boolean>();

  constructor() {
    // check if in local storage or
    // load defaults here
  }

  doRefresh() {
    this.refresh = true;
    this.refreshChange.emit(this.refresh);
  }



}
