import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {modal} from '../../wubTypes';
import { Driver} from '../../wubTypes';
import 'setimmediate'; // csv-parse uses setImmediate, this include fixes it
import * as csvParse from 'csv-parse';

@Component({
  selector: 'app-driver-selector',
  templateUrl: './driver-selector.component.html',
  styleUrls: ['./driver-selector.component.css']
})
export class DriverSelectorComponent implements OnInit {
  @Input() active: string;
  @Output() activeChange = new EventEmitter<modal>();
  public drivers: Array<Driver>;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnInit() {
    console.log('ngOnInit');
    const parser = csvParse({delimiter: ',', quote: false, rowDelimiter: '#'});
    parser.on('readable', function() {
      console.log('readable');
      let r;
      while (r = parser.read()) {
        console.log('Record:');
        this.drivers.push(
{
Name: r[3],
Vas: r[10],
Qes: r[],
Qms: r[],
Qts: r[],
Fs: r[],
PEmax: r[],
Sd: r[],
Xmax: r[],



}


        );
      }
    });
    parser.on('error', function(err){
      console.log(err.message);
    });
    parser.on('end', function(){
      console.log('reached end');
    });
    this.http.get('assets/drivers.csv', {responseType: 'text'})
    .subscribe(
        data => {
          console.log('got data');
          const dataArray = data.split('\n');
          // ignore labels
          dataArray.unshift();
          dataArray.forEach(row => {
            parser.write(row);
          });
          parser.end();
        },
        error => {
          console.log('error');
            console.log(error);
        }
    );
  }
  close() {
    this.activeChange.emit(modal.none);
  }
}
