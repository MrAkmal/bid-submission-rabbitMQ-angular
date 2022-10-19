import axios from "axios";
import { Injectable } from "@angular/core";
import { TenderCreateDTO, TenderUpdateDTO } from "src/app/interface/tender-interface";

@Injectable({
  providedIn: "root"
})
export class TenderAPI {


  baseUrl: string = "http://localhost:9191/v1/tender";


  constructor() {
  }


  async getAllTender() {

    return await axios.get(this.baseUrl);

  }


  async getTenderById(tenderId: number) {

    return await axios.get(this.baseUrl + '/' + tenderId);

  }


  async create(dto: TenderCreateDTO) {

    let userId = localStorage.getItem("userId");

    return await axios.post(this.baseUrl + '?userId=' + userId, dto);

  }


  async update(dto: TenderUpdateDTO) {

    let userId = localStorage.getItem("userId");

    return await axios.put(this.baseUrl + '?userId=' + userId, dto);

  }


  async delete(tenderId: number) {

    let userId = localStorage.getItem("userId");

    return await axios.delete(this.baseUrl + +'/' + tenderId + '?userId=' + userId);

  }

}

