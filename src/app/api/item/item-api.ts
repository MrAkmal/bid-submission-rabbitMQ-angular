import axios from "axios";
import { Injectable } from "@angular/core";
import { ItemCreateDTO, ItemRateCreateDTO, ItemUpdateDTO } from "src/app/interface/item-interface";

@Injectable({
  providedIn: "root"
})
export class ItemAPI {


  baseUrl: string = "http://localhost:9191/v1/item";



  constructor() {
  }


  async getAllByTenderId(tenderId: number) {

    // let userId = localStorage.getItem("userId");
    let userId = 1;

    return await axios.get(this.baseUrl + '/rate/' + tenderId + '?userId=' + userId);

  }


  async getById(itemId: number) {

    return await axios.get(this.baseUrl + '/' + itemId);

  }


  async create(dto: ItemCreateDTO) {

    // let userId = localStorage.getItem("userId");
    let userId = 1;

    return await axios.post(this.baseUrl + '?userId=' + userId, dto);

  }


  async update(dto: ItemUpdateDTO) {

    // let userId = localStorage.getItem("userId");
    let userId = 1;

    return await axios.put(this.baseUrl + '?userId=' + userId, dto);

  }


  async delete(itemId: number) {

    // let userId = localStorage.getItem("userId");
    let userId = 1;

    return await axios.delete(this.baseUrl + '/' + itemId + '?userId=' + userId);

  }


  async rate(dto: ItemRateCreateDTO) {

    // let userId = localStorage.getItem("userId");
    let userId = 2;

    return await axios.post(this.baseUrl + '?userId=' + userId, dto);

  }


  async rateSumUp(tenderId: number) {

    // let userId = localStorage.getItem("userId");
    let userId = 2;

    return await axios.post(this.baseUrl + '/' + tenderId + '?userId=' + userId);

  }


  async getAllByTenderFormId(tenderFormId: number) {

    // let userId = localStorage.getItem("userId");
    let userId = 2;

    return await axios.get(this.baseUrl + '/tender_form/' + tenderFormId + '?userId=' + userId);

  }


  async getAllItemRateByItemId(itemId: number) {

    // let userId = localStorage.getItem("userId");
    let userId = 1;

    return await axios.get(this.baseUrl + '/item_rate/' + itemId + '?userId=' + userId);

  }

  async rateItem(dto: ItemRateCreateDTO) {

    // let userId = localStorage.getItem("userId");
    let userId = 1;

    return await axios.post(this.baseUrl + '/rate/?userId=' + userId, dto);

  }



}

