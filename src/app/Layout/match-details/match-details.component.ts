import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { menulist } from 'src/app/interfaces/menulist';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  offersList: menulist[] = [];//store menu list get from "fulloffer" offer
  matchDetail: any; //for store match details
  
  constructor(private sharedDataService: SharedDataService, private socketService: SocketService) { }

  ngOnInit(): void {
    //init socket using offer
    this.socketService.fetchfulloffer();

    //get data from event full offer
    this.socketService.OnFetchFullOffer()

      .pipe(take(1))  //this will limit the observable to only one value
      .subscribe((offers: any) => {

        this.offersList = offers;

      });

    //for get match detials from match component
    this.sharedDataService.getMatchDeatilsEventEmitter().subscribe(matchDetail => {
      this.matchDetail = matchDetail;
    });
  }

}
