import { Component, OnInit, Input } from '@angular/core';
// import * as $ from 'jquery';
declare const $: any;

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @Input() id: string;

  constructor() { }

  ngOnInit(): void {
    $('#myDatepicker2').datetimepicker({
      format: 'DD/MM/YYYY'
  });
  }

}
