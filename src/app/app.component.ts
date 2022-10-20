import { AuthAPI } from 'src/app/api/auth/auth-api';
import { Component, Injectable, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { NotificationService } from './service/notification.service';
import { WebsocketService } from './service/websocket.service';
import { RabbitDTO } from './interface/auth-interface';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bid-submission-rabbitMQ-angular';


  constructor(private messageService: MessageService,
    private notificationService: NotificationService,
    private websocketService: WebsocketService,
    private primengConfig: PrimeNGConfig, private router: Router, private authApi: AuthAPI) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.check();
  }

  check() {
    if (localStorage.getItem("userId") === null) {
      this.router.navigate(['/login']);
    } else if (localStorage.getItem("role") === 'ROLE_AGENCY_USER') {
      this.connect();
    }
  }

  connect(): void {
    this.websocketService.connect();
  }

  disconnect(): void {
    this.websocketService.disconnect();
  }




}
