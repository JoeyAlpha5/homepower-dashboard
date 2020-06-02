import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UnitsComponent } from '../units/units.component'
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  residence = [];
  constructor(private authService: AuthService, private route: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    var username = this.authService.decodeToken();
    console.log(username);
    var getRes = this.authService.getResidence(username);
    getRes.subscribe(re=>{
      for(var count = 0; count < re.length; count++){
        this.residence.push(re[count]);
      }
      console.log(this.residence);
    });
  }

  unit(id){
    // console.log(id);
    const dialogRef = this.dialog.open(UnitsComponent,{data: {res_id:id}});

  }

}

