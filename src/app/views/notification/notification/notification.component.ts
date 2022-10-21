import { MessageService } from 'primeng/api';
import { NotificationClickDTO, NotificationDTO } from './../../../interface/notification-interface';
import { NotificationAPI } from './../../../api/notification/notification-api';
import { Component, Injectable, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: "root"
})
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  position!: string;

  notifications: NotificationDTO[] = [];

  count: number = 0;


  constructor(private notificationService: NotificationService, private router: Router, private notificationApi: NotificationAPI, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getAllNotification();
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

      if (data!==1) {
        this.notifications.unshift(data);
        this.count += 1;
      } else {
        this.getAllNotification();
      }
    });
  }


  isNotification(obj: any): obj is NotificationDTO {
    return 'totalRate' in obj && 'bidderId' in obj && 'tenderId' in obj && 'click' in obj && 'submissionDateTime' in obj;
  }


  getAllNotification() {
    this.notificationApi.getAll()
      .then(res => {
        console.log(res);
        this.notifications = res.data;
        this.count = this.unRead();
      }).catch(err => {
        console.log(err);
      })
  }

  unRead(): number {
    return this.notifications
      .filter(function (task) {
        return !task.click
      }).length;
  }


  dateDifference(date: string): string {
    let startDate = new Date(date);
    let endDate = new Date();
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));


    if (days > 0) return days + 'day';
    else if (hours > 0) return hours + 'h';
    else if (minutes > 0) return minutes + 'min';
    else return seconds + 's';

  }

  notificationDetail(tenderId: number, bidderId: number) {
    this.notificationDisplay = false;
    console.log(tenderId,bidderId)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/notification/view/' + tenderId + '/' + bidderId]);
    });
  }

}

