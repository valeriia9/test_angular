import { EventEmitter, Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  sportName: EventEmitter<any> = new EventEmitter();
  matchDetail: EventEmitter<any> = new EventEmitter();   //store match Details
  marketValue: EventEmitter<any> = new EventEmitter();   //store marketvalue for ticket

  constructor() {}
  
  emitSportEvent(value) {
    this.sportName.emit(value);
  }

  //get sport name data with event emitter
  getSportEventEmitter() {
    return this.sportName;
  }

  emitOfferEvent(value) {
    this.matchDetail.emit(value);
  }

  //get match detail with event emitter
  getMatchDeatilsEventEmitter() {
    return this.matchDetail;
  }

    emitToggleTicketEvent(value) {
    this.marketValue.emit(value);
  }

  //get match detail with event emitter
  getToggleTicketEventEmitter() {
    return this.marketValue;
  }

  
  //function for Group Data by sportname,countryname,leaguename
  groupByMulti(offerList, values, context) {
    if (!values.length)
      return offerList;
    var GroupingData = _.groupBy(offerList, values[0], context),
      rest = values.slice(1);
    for (var prop in GroupingData) {
      GroupingData[prop] = this.groupByMulti(GroupingData[prop], rest, context);
    }
    return GroupingData;
  };
}
