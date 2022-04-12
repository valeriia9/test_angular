import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NavEventEmmitterService } from "../../utility-app/event-emitters/nav-event-emmitter.service";
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { menulist } from 'src/app/interfaces/menulist';
import { first, take } from 'rxjs/operators';
import * as _ from 'underscore';
import { SharedDataService } from "../../Services/shared-data.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  offersList: menulist[] = [];//store menu list get from "fulloffer" offer
  menuitem: menulist[] = [];
  menuData: any;

  constructor(private sharedDataService: SharedDataService, private router: Router, private socketService: SocketService) { }

  ngOnInit(): void {

    //init socket using offer
    this.socketService.fetchfulloffer();

    //get data from event full offer
    this.socketService.OnFetchFullOffer()

      .pipe(take(1))  //this will limit the observable to only one value
      .subscribe((offers: any) => {

        this.offersList = offers;

        //for now get only HOHEJ data from fullOffer event

        this.menuitem = this.offersList.filter(x => x.sportName == "HOKEJ");

        this.menuData = _.chain(this.menuitem)
          .groupBy('sportName')//group by using sports name
          .mapObject(function (sportname) {
            return _.groupBy(sportname, 'countryName'); //group by countryname
          }).value();


        console.log(this.offersList.filter(x => x.sportName == "NOGOMET").filter(x=>x.countryName=="SPECIJAL").filter(x=>x.leagueName=="DUEL EKIPA"));
        console.log(this.offersList.filter(x => x.sportName == "NOGOMET").filter(x=>x.countryName=="ENGLESKA").filter(x=>x.leagueName=="PREMIER LIGA"));
      });
  }

  //Group by in lenguename
  leagueGropName(list: any) {
   
    var leagueName = _.groupBy(list, 'leagueName');
    return leagueName;
  }

  //get match details by sport name
  getMatchesBySportName(sportName: any) {
 
    this.sharedDataService.emitSportEvent(sportName);
  }


}
