import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { menulist } from './interfaces/menulist';
import { SharedDataService } from './Services/shared-data.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BettingTickets-Angular application to display “offer” and create betting tickets.';


  constructor() {

  }


  
}
