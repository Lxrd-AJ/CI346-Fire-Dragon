import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ShiftService } from './../shift.service';
import { Shift } from './../models/shift';
import { MdSnackBar } from '@angular/material';
import { AddShiftDialogComponent } from '../add-shift-dialog/add-shift-dialog.component';

@Component({
  selector: 'shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css'],
  providers: [ShiftService, MdSnackBar]
})
export class ShiftComponent implements OnInit {

    isLoading = false;
    shifts: Shift[] = []

    constructor(private shiftService: ShiftService,
                public shiftDialog: MdDialog,
                public snackBar: MdSnackBar ) {}

    ngOnInit() {
        this.isLoading = true;
        this.shiftService.getShifts().then((shifts) => {
            console.log(shifts);
            this.isLoading = false;
        })
    }

    launchDialog(){
        let dialogRef = this.shiftDialog.open(AddShiftDialogComponent, {
            width: '50%',
            height: '60%',
            disableClose: true,
            //position: {top: '-50', bottom: '50', left: '-50', right: '50' },
            data: new Shift(null,null,new Date(),null)
        });
        dialogRef.afterClosed().subscribe(emp=> {
            console.info("`afterClosed` message from shift dialog ---")
            //NB: emp is always undefined, most likely due to a bug in angular that doen't return the passed data
            //so we shall take the object directly from the dialog
            const shift: Shift = dialogRef.componentInstance.model;
            console.info("Newly created Shift object")
            console.info(shift);
            this.shiftService.saveShift(shift).then((response) => {
                if( response.status == 200 ){
                    console.info("Successfully sent employee data to the server")
                    const json = response.json()
                    shift.id = json.id;
                    console.info(`Recieved from Server -> ${JSON.stringify(shift)}`)
                    this.snackBar.open(`Successfully saved ${shift.name}`,"Close",{duration: 3000});
                }else{
                    console.error(response)
                    this.snackBar.open(response.statusText,"Close",{duration: 2000});
                }
                this.shifts.unshift(shift); //No pun intended :)
            });
        })
    }

}
