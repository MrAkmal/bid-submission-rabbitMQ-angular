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

}

