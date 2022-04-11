import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/Services/shared-data.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticketData: Array<any> = []; //for store tickets array from localstorage
  constructor(private sharedDataService: SharedDataService, private router: Router) { }

  ngOnInit(): void {
    //for getting all generated tickets
    this.ticketData = JSON.parse(localStorage.getItem('allTicketData'));
   // setTimeout(() => {
      this.router.navigate(['/tickets']);
    //}, 1000);

    //for ticket Data for ticket component
    this.sharedDataService.getToggleTicketEventEmitter().subscribe(ticketData => {
      this.ngOnInit();
      this.ticketData = ticketData;
      //this.ticketData = JSON.parse(localStorage.getItem('allTicketData'));
      setTimeout(() => {
        this.router.navigate(['/tickets']);
      }, 1000);

    });
  }

  removeTicket(tickedId: any) {
    this.ticketData = JSON.parse(localStorage.getItem('allTicketData'));
    var removeindex=this.ticketData.findIndex(x=>x.ticketId==tickedId);
    this.ticketData.splice(removeindex,1);
    localStorage.setItem('allTicketData', JSON.stringify(this.ticketData));
    this.ngOnInit();
    setTimeout(() => {
      this.router.navigate(['/tickets']);
    }, 1000);

  }

}
