import { AuthAPI } from 'src/app/api/auth/auth-api';
import { Component, Injectable, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { NotificationService } from './service/notification.service';
import { WebsocketService } from './service/websocket.service';
import { RabbitDTO } from './interface/auth-interface';

import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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
  message:any = null;

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
      this.requestPermission();
      this.listen();
      this.connect();
    }
  }

  connect(): void {
    this.websocketService.connect();
    this.notify();
  }

  disconnect(): void {
    this.websocketService.disconnect();
  }

  notify(): void {
    this.notificationService.notificationMessage.subscribe((data) => {
      console.log('receive message', data);
      let dto: RabbitDTO = data;
      this.messageService.add({
        severity: "success",
        summary: "Rated",
        detail: "" + dto.totalRate + " | Tender : " + dto.tenderId + " | Bidder : " + dto.userId + " | Date : " + dto.submissionDateTime
      });
    });
  }


  //firebase

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging,
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }

}
