import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-next-action',
  templateUrl: './next-action.component.html',
  styleUrls: ['./next-action.component.css']
})
export class NextActionComponent implements OnInit {

  bestAction: string;
  constructor() {
    this.bestAction = 'Choose Driver';
  }

  ngOnInit() {
  }

}
