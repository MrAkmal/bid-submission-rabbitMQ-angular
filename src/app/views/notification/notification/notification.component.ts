import { RabbitDTO } from './../../../interface/auth-interface';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';



@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  position!: string;

  notifications:RabbitDTO[]=[];


  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.notify();
  }

  notificationDisplay: boolean = false;

  showNotification() {
    this.position = 'top-right';
    this.notificationDisplay = true;
  }

  notify(): void {
    this.notificationService.notificationMessage.subscribe((data) => {
      console.log('receive message', data);
      this.notifications.unshift(data);
    });
  }

}

