import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { SocketService } from 'src/app/services/socket.service';
import { first, take } from 'rxjs/operators';
import * as _ from 'underscore';
import { menulist } from 'src/app/interfaces/menulist';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  matchDetails: any; //for store match details
  offersList: menulist[] = [];//store menu list get from "fulloffer" offer

  constructor(private sharedDataService: SharedDataService, private socketService: SocketService) {

  }


  ngOnInit(): void {
    //init socket using offer
    this.socketService.fetchfulloffer();

    //get data from event full offer
    this.socketService.OnFetchFullOffer()

      .pipe(take(1))  //this will limit the observable to only one value
      .subscribe((offers: any) => {

        this.offersList = offers;

      });

    //for get match detials from menu component
    this.sharedDataService.getSportEventEmitter().subscribe(sportname => {
      // var sportnameList = _.filter(this.offersList, x => x.sportName == sportname);
      //var sportnameList = _.filter(this.offersList, x => x.sportName == "NOGOMET").filter(x => x.countryName == "SPECIJAL").filter(x => x.leagueName == "DUEL EKIPA");
      var sportnameList = _.filter(this.offersList, x => x.sportName == "NOGOMET");

      this.matchDetails = this.sharedDataService.groupByMulti(sportnameList, ['sportName', 'countryName', 'leagueName'], null); //call function for groupting Data
    });

  }

  //get match details componenet Data
  getMatchComponentData(matchDetail: any) {
    this.sharedDataService.emitOfferEvent(matchDetail);
  }
}
