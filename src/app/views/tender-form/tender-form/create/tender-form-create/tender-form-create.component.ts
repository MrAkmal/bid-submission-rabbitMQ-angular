import { TenderFormCreateDTO } from './../../../../../interface/tender-form-interface';
import { TenderFormComponent } from './../../tender-form.component';
import { TenderFormAPI } from 'src/app/api/tender-form/tender-form-api';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tender-form-create',
  templateUrl: './tender-form-create.component.html',
  styleUrls: ['./tender-form-create.component.css']
})
export class TenderFormCreateComponent implements OnInit {

  @Input()
  tenderId!: number;


  tenderForm!: FormGroup;
  isSaving: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private tenderFormApi: TenderFormAPI,
    private tenderFormComponent: TenderFormComponent,
    private messageService: MessageService) {

    this.initializeForm();

  }

  ngOnInit(): void {
    this.initializeForm();
  }


  displayModal!: boolean;
  showModalDialog() {
    this.initializeForm();
    this.displayModal = true;
  }

  save() {

    this.isSaving = true;
    const val = this.tenderForm.value;

    if (val.name) {
      let dto: TenderFormCreateDTO = {
        name: val.name,
        tenderId: this.tenderId
      }

      this.tenderFormApi.create(dto)
        .then(res => {
          console.log(res);
          this.displayModal = false;
          this.messageService.add({
            severity: "success",
            summary: '' + res.status,
            detail: res.data.message
          });
          this.isSaving = false;
          this.initializeForm();
          this.tenderFormComponent.getAllTenderFormByTenderId(this.tenderId);
        }).catch(err => {
          console.log(err);
          if (err.response) {
            this.messageService.add({
              severity: "error",
              summary: err.response.status,
              detail: err.response.data.message
            });
            this.isSaving = false;
          } else {
            this.messageService.add({
              severity: "error",
              summary: "Unknown",
              detail: "Unknown Error"
            });
            this.isSaving = false;
          }
        })
    } else {
      this.isSaving = false;
      this.messageService.add({
        severity: "error",
        summary: "Please fill form",
        detail: (!val.name ? "Required Name" : ' ')
      });
    }

  }


  initializeForm() {
    this.tenderForm = this.formBuilder.group({

      name: ['', Validators.required]

    });
  }

}
