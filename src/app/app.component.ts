import { Component } from '@angular/core';
import {modal} from './wubTypes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'Wubsonic';
  active = modal.none;
  choices = modal;


  clickOpen(open) {
      this.active = open;
    }
}
