import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Tenders',
        routerLink:"tender"
      },
      {
        label: "Bid Submissions"
      },
      {
        label:"Logout"
      }
    ]
  }


}
