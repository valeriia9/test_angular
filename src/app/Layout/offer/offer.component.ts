import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { SocketService } from 'src/app/services/socket.service';
import { first, take } from 'rxjs/operators';
import * as _ from 'underscore';
import { menulist } from 'src/app/interfaces/menulist';
import { object } from 'underscore';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  matchDetails: any; //for store match details
  offersList: menulist[] = [];//store menu list get from "fulloffer" offer
  allTicketsData: Array<any> = [];  //for store all tickets data
  ticketId: number; //for store index for ticked id
  filterData: any; //for store filterData for ticket create
  ticketCheck: boolean = false; //for check ticket toggle
  constructor(private sharedDataService: SharedDataService, private socketService: SocketService, private router: Router) {

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

    localStorage.removeItem("competitorsName");

    //for get match detials from menu component
    this.sharedDataService.getSportEventEmitter().subscribe(sportname => {
      var sportnameList = _.filter(this.offersList, x => x.sportName == sportname);
      // var sportnameList = _.filter(this.offersList, x => x.sportName == "NOGOMET").filter(x => x.countryName == "SPECIJAL").filter(x => x.leagueName == "DUEL EKIPA");
      // var sportnameList = _.filter(this.offersList, x => x.sportName == "NOGOMET");

      this.matchDetails = this.sharedDataService.groupByMulti(sportnameList, ['sportName', 'countryName', 'leagueName'], null); //call function for groupting Data

    });



  }

  //get match details componenet Data
  getMatchComponentData(matchDetail: any) {
    this.sharedDataService.emitOfferEvent(matchDetail);
  }


  //Toggle Ticket with clicked market value
  toggleTicketWithMarketValue(oddData: any, marketData: any) {
    debugger
    this.ticketCheck = !this.ticketCheck;
    // this.allTicketsData = JSON.parse(localStorage.getItem('allTicketData'));
    this.ticketId = 1;
    if (this.allTicketsData.length > 0) {
      this.ticketId = this.allTicketsData.length + 1;
    }
    var ticketobj = {
      ticketId: this.ticketId,
      marketId: marketData.id,
      competitors: marketData.competitors,
      marketName: marketData.markets[0].name,
      alias: oddData.alias,
      matchDate: marketData.matchDate,
      values: oddData.values[0],
      order: oddData.order
    };

    //  if(this.allTicketsData==null && this.allTicketsData!=null){
    this.filterData = this.allTicketsData.filter(x => x.competitors == ticketobj.competitors && x.order == ticketobj.order);
    if (this.ticketCheck && this.filterData.length<=0 || this.allTicketsData == undefined || this.allTicketsData == null) {
      this.changeBackGroundColor(ticketobj.competitors, ticketobj.order);
      //this.filterData = this.allTicketsData.filter(x => x.competitors == ticketobj.competitors && x.order == ticketobj.order);
      //if (this.filterData.length <= 0) {
      this.allTicketsData.push(ticketobj);
      localStorage.setItem('allTicketData', JSON.stringify(this.allTicketsData));
      this.sharedDataService.emitToggleTicketEvent(this.allTicketsData);
      this.ticketCheck = false;
    }
    else {
      this.changeBackGroundColor(ticketobj.competitors, ticketobj.order);
      //this.allTicketsData = JSON.parse(localStorage.getItem('allTicketData'));
      //this.filterData = this.allTicketsData.filter(x => x.competitors == ticketobj.competitors && x.order == ticketobj.order);
      this.ticketCheck = false;
      var removeindex = this.allTicketsData.findIndex(x => x.competitors == ticketobj.competitors && x.order == ticketobj.order);
      this.allTicketsData.splice(removeindex, 1);
      localStorage.setItem('allTicketData', JSON.stringify(this.allTicketsData));
      //this.ticketCheck=true;
      //this.router.navigateByUrl('/tickets');
      this.router.navigate(['/tickets']);
    }
    // }


  }

  changeBackGroundColor(competitors: any, order: number) {
    this.ticketCheck = false;
    var span = document.getElementById("span" + competitors + order);
    console.log(span)
    if (span.className == "bg-grey-8") {
      span.className = "bg-red-9 text-white";
    }
    else {
      span.className = "bg-grey-8";
    }
  }

  // for offercomponent load odd color marked
  checkedBackground(competitors: any, order: number) {
    let ticketsList = JSON.parse(localStorage.getItem('allTicketData'));
    if (ticketsList != null) {
      var filterdValue = _.find(ticketsList, (obj) => { return obj.competitors == competitors && obj.order == order; });
      if (filterdValue == undefined || filterdValue == null) {
        return "bg-grey-8";
      }
      else {
        return "bg-red-9 text-white";
      }
    }
    else {
      return "bg-grey-8";
    }
  }

  //for check mark the match detials tr highlight
  checkedMarketBackground(competitors: any) {

    let competitorsName = localStorage.getItem('competitorsName');
    if (competitorsName != undefined && competitorsName != null) {

      if (competitorsName == competitors) {
        return "bg-green-10";
      }
      else {
        return "";
      }
    }
    else {
      return "";
    }
  }

  //set the background color of match details tr
  setMarketBackground(competitors: any) {
    localStorage.setItem('competitorsName', competitors);
  }
}

