import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  constructor(private socket: Socket) { }

  // emit event
  fetchfulloffer() {
    this.socket.emit('fullOffer');
  }

  // listen event
  OnFetchFullOffer() {
    var testdata = this.socket.fromEvent('fullOffer');
    return testdata;
  }

  // listen event
  OnFetchmatch() {
    return this.socket.fromEvent('matches');
  }
}
