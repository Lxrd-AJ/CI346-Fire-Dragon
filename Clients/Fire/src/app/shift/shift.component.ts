import { Component, OnInit } from '@angular/core';
import { ShiftService } from './../shift.service';

@Component({
  selector: 'shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css'],
  providers: [ShiftService]
})
export class ShiftComponent implements OnInit {

  constructor(private shiftService: ShiftService ) { }

  ngOnInit() {
    this.shiftService.getShifts().then((shifts) => {
      console.log(shifts);
    })
  }

}
