import { TenderFormCreateDTO, TenderFormUpdateDTO } from './../../interface/tender-form-interface';
import axios from "axios";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TenderFormAPI {


  baseUrl: string = "http://localhost:9191/v1/tender_form";



  constructor() {
  }


  async getAllTenderFormByTenderId(tenderId: number) {

    return await axios.get(this.baseUrl + '/tender/' + tenderId);

  }

  async getById(tenderFormId: number) {

    return await axios.get(this.baseUrl + '/' + tenderFormId);

  }


  async create(dto: TenderFormCreateDTO) {

    // let userId = localStorage.getItem("userId");
    let userId = 1;

    return await axios.post(this.baseUrl + '?userId=' + userId, dto);

  }

  async update(dto: TenderFormUpdateDTO) {

    // let userId = localStorage.getItem("userId");
    let userId = 1;

    return await axios.put(this.baseUrl + '?userId=' + userId, dto);

  }


  async delete(tenderFormId: number) {

    // let userId = localStorage.getItem("userId");
    let userId = 1;

    return await axios.put(this.baseUrl + '/' + tenderFormId + '?userId=' + userId);

  }

}

