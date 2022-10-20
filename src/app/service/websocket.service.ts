import { Injectable } from '@angular/core';
import { WEBSOCKET_ENDPOINT, WEBSOCKET_NOTIFY_TOPIC } from '../constants/base-url.constants';
import { NotificationService } from './notification.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  stompClient: any;

  constructor(private notificationService: NotificationService) { }

  connect(): void {
    console.log('webSocket Connection');
    const ws = new SockJS(WEBSOCKET_ENDPOINT);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function () {
      _this.stompClient.subscribe(WEBSOCKET_NOTIFY_TOPIC, function (sdkEvent: any) {
        _this.onMessageReceived(sdkEvent);
      });
    }, this.errorCallBack);
  }


  disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: any) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }
  onMessageReceived(message: any) {
    console.log('Message Recieved from Server :: ' + message);
    // Emits the event.
    this.notificationService.notificationMessage.emit(JSON.parse(message.body));
  }

}
