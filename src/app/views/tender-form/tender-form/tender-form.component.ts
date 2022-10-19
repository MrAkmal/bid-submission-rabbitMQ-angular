import { TenderAPI } from './../../../api/tender/tender-api';
import { TenderFormAPI } from 'src/app/api/tender-form/tender-form-api';
import { TenderFormDTO } from './../../../interface/tender-form-interface';
import { Component, OnInit } from '@angular/core';
import { TenderDTO } from 'src/app/interface/tender-interface';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-tender-form',
  templateUrl: './tender-form.component.html',
  styleUrls: ['./tender-form.component.css']
})
export class TenderFormComponent implements OnInit {

  tenderId!: number;

  tenderForms: TenderFormDTO[] = [];

  tender: TenderDTO = {
    id: 0,
    description: ''
  };

  isLoaded: boolean = false;

  constructor(private tenderApi: TenderAPI, private route: ActivatedRoute,
    private tenderFormApi: TenderFormAPI,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.tenderId = this.route.snapshot.params['tenderId'];
    this.getAllTenderFormByTenderId(this.tenderId);
    this.getTenderById(this.tenderId);
  }

  getAllTenderFormByTenderId(tenderId: number) {
    this.tenderFormApi.getAllTenderFormByTenderId(tenderId)
      .then(res => {
        console.log(res);
        this.tenderForms = res.data.data;
      }).catch(err => {
        console.log(err);
      })
  }

  getTenderById(tenderId: number) {
    this.tenderApi.getTenderById(tenderId)
      .then(res => {
        console.log(res);
        this.tender = res.data.data;
        this.isLoaded = true;
      }).catch(err => {
        console.log(err);
      })
  }

  delete(tenderFormId: number) {

    this.messageService.clear('c');

    this.tenderFormApi.delete(tenderFormId)
      .then(res => {
        this.messageService.add({
          severity: "error",
          summary: "" + res.status,
          detail: res.data.message
        });
        this.getAllTenderFormByTenderId(this.tenderId);
      }).catch((error: any) => {
        console.log(error);
        this.messageService.add({
          severity: "error",
          summary: error.response.status,
          detail: error.response.data.message
        });
        this.getAllTenderFormByTenderId(this.tenderId);
      });
  }

  showConfirm(tenderFormId: number) {
    this.messageService.clear();
    this.messageService.add({
      key: 'c', sticky: true,
      severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed', id: tenderFormId
    });
  }


  onReject() {
    this.messageService.clear('c');
    this.messageService.add({
      severity: "info",
      summary: "Cancelled",
      detail: "Deleteing Cancelled"
    });
  }

}
