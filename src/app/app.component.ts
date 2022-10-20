import { AuthAPI } from 'src/app/api/auth/auth-api';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bid-submission-rabbitMQ-angular';

  constructor(private primengConfig: PrimeNGConfig, private router: Router, private authApi: AuthAPI) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.check();
  }
  
  check() {
    if (localStorage.getItem("userId")===null) {
      this.router.navigate(['/login']);
    }
  }

}
