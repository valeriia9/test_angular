import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavEventEmmitterService {

  navchange: EventEmitter<string> = new EventEmitter();

  constructor() {}
  
  emitNavChangeEvent(value) {
    this.navchange.emit(value);
  }

  getNavChangeEmitter() {
    return this.navchange;
  }

}
