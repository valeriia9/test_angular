import { Component, OnInit } from '@angular/core';
import { NavEventEmmitterService } from "../../utility-app/event-emitters/nav-event-emmitter.service";

@Component({
  selector: 'app-day-filter',
  templateUrl: './day-filter.component.html',
  styleUrls: ['./day-filter.component.css']
})
export class DayFilterComponent implements OnInit {

  radioModel = 'Middle';

  constructor(private navEventEmmitterService: NavEventEmmitterService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.navEventEmmitterService.emitNavChangeEvent('one day');  
    });
    
  }

  public dayFilterChange(type: string) {
    this.navEventEmmitterService.emitNavChangeEvent(type);
  }
}
