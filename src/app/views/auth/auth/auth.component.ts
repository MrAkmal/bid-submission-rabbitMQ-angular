import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthAPI } from 'src/app/api/auth/auth-api';
import { LoginDTO } from 'src/app/interface/auth-interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm!: FormGroup;
  isLogin: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authAPI: AuthAPI) {

    this.initializeForm();

  }

  ngOnInit(): void {
  }


  login() {
    this.isLogin = true;
    let val = this.loginForm.value;

    if (val.username) {

      let dto: LoginDTO = {
        name: val.username
      }


      this.authAPI.login(dto)
        .then(res => {
          console.log("login response", res);

          if (res.status === 200) {

            let userInfo = res.data.data;

            localStorage.setItem('userId', userInfo.id);
            localStorage.setItem('role', userInfo.role);

            this.router.navigate(['/'])
              .then(() => {
                window.location.reload();
              });

            this.messageService.add({
              severity: "success",
              summary: res.data.status,
              detail: res.data.message
            });

          }

          this.isLogin = false;
        }).catch(err => {
          console.log(err);
          if (err.response) {
            this.messageService.add({
              severity: "error",
              summary: err.response.data.status,
              detail: err.response.data.message
            });
            this.isLogin = false;
          } else {
            this.messageService.add({
              severity: "error",
              summary: "Unknown",
              detail: "Unknown Error"
            });
            this.isLogin = false;
          }
        })
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Please Fill Form",
        detail: (!val.username ? "Required Username " : '')
      });
      this.isLogin = false;
    }

  }




  initializeForm() {
    this.loginForm = this.formBuilder.group({

      username: ['', Validators.required]

    });
  }

}
