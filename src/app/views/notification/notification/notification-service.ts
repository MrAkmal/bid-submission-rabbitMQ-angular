import { RabbitDTO } from './../../../interface/auth-interface';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class Test {

  constructor(private router: Router,) {
  }


  async notification(dto: RabbitDTO) {

    return dto;

  }



}


