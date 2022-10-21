import { AuthAPI } from './../../../../../api/auth/auth-api';
import { TenderAPI } from './../../../../../api/tender/tender-api';
import { NotificationClickDTO, NotificationDTO } from './../../../../../interface/notification-interface';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotificationAPI } from 'src/app/api/notification/notification-api';
import { TenderDTO } from 'src/app/interface/tender-interface';
import { UserDTO } from 'src/app/interface/auth-interface';
import { NotificationComponent } from '../../notification.component';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements OnInit {

  @Input()
  bidderId!: number;

  @Input()
  tenderId!: number;

  isLoaded:boolean=false;

  tender: TenderDTO = {
    id: 0,
    description: ''
  };

  user: UserDTO = {
    name: ''
  }

  notification: NotificationDTO = {
    totalRate: 0,
    bidderId: 0,
    tenderId: 0,
    click: false,
    submissionDateTime: ''
  };


  constructor(private route: ActivatedRoute,
    private tenderApi: TenderAPI,
    private authApi: AuthAPI,
    private notificationComponent:NotificationComponent,
    private messageService: MessageService,
    private notificationApi: NotificationAPI) { }

  ngOnInit(): void {
    this.bidderId = this.route.snapshot.params['bidderId'];
    this.tenderId = this.route.snapshot.params['tenderId'];


    this.getTenderById(this.tenderId);
    this.getUserById(this.bidderId);
    this.getNotificationByBidderIdAndTenderId(this.tenderId, this.bidderId);
  }

  updateClick() {
    let dto: NotificationClickDTO = {
      bidderId: this.bidderId,
      tenderId: this.tenderId
    }

    this.notificationApi.onClick(dto)
      .then(res => {
        console.log(res);
        this.notificationComponent.getAllNotification();
      }).catch(err => {
        console.log(err);
      })
  }

  getTenderById(tenderId: number) {
    this.tenderApi.getTenderById(tenderId)
      .then(res => {
        console.log(res);
        this.tender = res.data.data;
      }).catch(err => {
        console.log(err);
      });

  }

  getUserById(userId: number) {
    this.authApi.get(userId)
      .then(res => {
        console.log(res);
        this.user = res.data.data;
      }).catch(err => {
        console.log(err);
      });

  }

  getNotificationByBidderIdAndTenderId(tenderId: number, bidderId: number) {
    this.notificationApi.get(tenderId, bidderId)
      .then(res => {
        console.log(res);
        this.notification = res.data;
        if (this.notification.click === false) {
          this.updateClick();
        }
        this.isLoaded=true;
      }).catch(err => {
        console.log(err);
      });

  }

}
