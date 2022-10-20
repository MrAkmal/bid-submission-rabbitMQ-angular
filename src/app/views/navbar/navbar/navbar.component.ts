import { AuthAPI } from 'src/app/api/auth/auth-api';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuItems: MenuItem[] = [];
  isLogged:boolean=false;
  isAgencyUser:boolean=false;

  constructor(private authApi: AuthAPI) { }

  ngOnInit() {
    this.getMenu();
  }


  getMenu() {
    let userId = localStorage.getItem("userId");
    if (userId) {
      this.isLogged=true;
      if(localStorage.getItem("role")==='ROLE_AGENCY_USER'){
        this.isAgencyUser=true;
      }
      this.menuItems = [
        {
          label: 'Tenders',
          routerLink: "tender"
        },
        {
          label: "Bid Submissions"
        },
        {
          label: "Logout",
          command: () => {
            this.authApi.logout();
          }
        }
      ]
    }
  }
}
