import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  units = [];
  message = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    console.log(this.data.res_id);
    this.getUnits(this.data.res_id);
  }

  getUnits(id){
    var units = this.authService.getUnit(id);
    units.subscribe(re=>{
      console.log(re);
      for(var count = 0; count < re.length; count++){
        this.units.push(re[count]);
      }
    })
  }

  toggle($event,cell){
    console.log(cell);
    console.log($event.checked);
    $event.checked == true ? this.message = "ClearRD0": this.message = "SetRD0";
    this.authService.Power(this.message,cell).subscribe(re=>{
      console.log(re);

    })
  }

}
