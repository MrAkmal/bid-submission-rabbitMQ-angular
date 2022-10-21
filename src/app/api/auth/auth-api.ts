import axios from "axios";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginDTO } from "src/app/interface/auth-interface";

@Injectable({
  providedIn: "root"
})
export class AuthAPI {


  baseUrl: string = "http://localhost:9191/v1/auth";



  constructor( private router: Router,) {
  }


  async login(dto: LoginDTO) {

    return await axios.post(this.baseUrl + '/login', dto);

  }


  async get(userId:number) {

    return await axios.get(this.baseUrl + '/'+userId);

  }

  async logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    this.router.navigate(['/login'])
              .then(() => {
                window.location.reload();
              });
  }

  async check() {
   return localStorage.getItem("userId");
  }


}


