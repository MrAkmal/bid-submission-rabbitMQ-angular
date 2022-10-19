import { TenderFormDTO, TenderFormUpdateDTO } from './../../../../../interface/tender-form-interface';
import { TenderAPI } from './../../../../../api/tender/tender-api';
import { TenderDTO } from 'src/app/interface/tender-interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TenderFormAPI } from 'src/app/api/tender-form/tender-form-api';
import { TenderFormCreateDTO } from 'src/app/interface/tender-form-interface';
import { TenderFormComponent } from '../../tender-form.component';

@Component({
  selector: 'app-tender-form-update',
  templateUrl: './tender-form-update.component.html',
  styleUrls: ['./tender-form-update.component.css']
})
export class TenderFormUpdateComponent implements OnInit {


  @Input()
  tenderId!: number;

  @Input()
  tenderFormId!: number;

  tenders: TenderDTO[] = [];
  tenderFormDTO: TenderFormDTO = {
    id: 0,
    name: ''
  };

  name!: string;
  tenderIds!: number;

  tenderForm!: FormGroup;
  isLoaded: boolean = false;
  isUpdating: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private tenderApi: TenderAPI,
    private tenderFormApi: TenderFormAPI,
    private tenderFormComponent: TenderFormComponent,
    private messageService: MessageService) {

    this.initializeForm();

  }

  ngOnInit(): void {
    this.initializeForm();
    this.getAllTender();
    this.getTenderFormById(this.tenderFormId);
  }


  displayModal!: boolean;
  showModalDialog() {

    this.displayModal = true;
  }

  getTenderFormById(tenderFormId: number) {
    this.tenderFormApi.getById(tenderFormId)
      .then(res => {
        console.log(res);
        this.tenderFormDTO = res.data.data;
        this.name = this.tenderFormDTO.name;
        this.tenderIds = this.tenderId;
        this.isLoaded = true;
      }).catch(err => {
        console.log(err);
      })
  }

  getAllTender() {
    this.tenderApi.getAllTender()
      .then(res => {
        console.log(res);
        this.tenders = res.data.data;
      }).catch(err => {
        console.log(err);
      })
  }

  update() {

    this.isUpdating = true;
    const val = this.tenderForm.value;

    if (val.name && val.tenderId) {
      let dto: TenderFormUpdateDTO = {
        name: val.name,
        tenderId: val.tenderId,
        id: this.tenderFormId
      }

      this.tenderFormApi.update(dto)
        .then(res => {
          console.log(res);
          this.displayModal = false;
          this.messageService.add({
            severity: "info",
            summary: '' + res.status,
            detail: res.data.message
          });
          this.isUpdating = false;
          this.tenderFormComponent.getAllTenderFormByTenderId(this.tenderId);
        }).catch(err => {
          console.log(err);
          if (err.response) {
            this.messageService.add({
              severity: "error",
              summary: err.response.status,
              detail: err.response.data.message
            });
            this.isUpdating = false;
          } else {
            this.messageService.add({
              severity: "error",
              summary: "Unknown",
              detail: "Unknown Error"
            });
            this.isUpdating = false;
          }
        })
    } else {
      this.isUpdating = false;
      this.messageService.add({
        severity: "error",
        summary: "Please fill form",
        detail: (!val.name ? "Required Name" : ' ')
      });
    }

  }


  initializeForm() {
    this.tenderForm = this.formBuilder.group({

      name: ['', Validators.required],

      tenderId: ['', Validators.required]

    });

  }



}
