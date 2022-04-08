import { EventEmitter, Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import * as _ from 'underscore';
import { menulist } from '../interfaces/menulist';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  sportName: EventEmitter<any> = new EventEmitter();
  // offersList: menulist[] = [];//store menu list get from "fulloffer" offer
  matchDetail: EventEmitter<any> = new EventEmitter();   //store match Details

  constructor() { }

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

  //get sport name data with event emitter
  getMatchDeatilsEventEmitter() {
    return this.matchDetail;
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

  // //Get fullofferList From socket
  // GetFullOfferList(){
  //  debugger
  //   this.socketService.fetchfulloffer();
  //   this.socketService.OnFetchFullOffer()

  //     .pipe(take(1))  
  //     .subscribe((offers: any) => {

  //       this.offersList = offers;
  //       debugger

  //     });
  //     return this.offersList;
  // }
}
