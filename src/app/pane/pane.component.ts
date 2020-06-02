import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pane',
  templateUrl: './pane.component.html',
  styleUrls: ['./pane.component.scss']
})
export class PaneComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.clear();
    this.route.navigate(["login"])
  }

}
