import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {UpdateService} from '../services/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  data = 'data';

  constructor(private dataService: DataService, private updateService: UpdateService) {
    this.data = this.getNewData();
  }
  ngOnInit(): void {
    this.updateService.getExchangeData();
    this.updateService.returnAsObservable().subscribe(() => {
      console.log('----------------------');
      console.log('Got Event');
      this.getNewData();
    });
  }
  public getNewData(): any {
    console.log('Getting new data');
    this.dataService.getData().subscribe(result => {
      console.log('Got new data');
      this.data = result.data;
      }
    );
  }
  ngOnDestroy(): void {
    this.updateService.stopExchangeUpdates();
  }
}
