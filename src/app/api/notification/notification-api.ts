import axios from "axios";
import { Injectable } from "@angular/core";
import { NotificationClickDTO } from "src/app/interface/notification-interface";

@Injectable({
  providedIn: "root"
})
export class NotificationAPI {


  baseUrl: string = "http://localhost:9292/v1/notification";



  constructor() {
  }


  async getAll() {

    return await axios.get(this.baseUrl);

  }

  async get(tenderId: number, bidderId: number) {

    return await axios.get(this.baseUrl + '/' + tenderId + '/' + bidderId);

  }


  async onClick(dto: NotificationClickDTO) {

    return await axios.post(this.baseUrl + '/on_click', dto);

  }



}

