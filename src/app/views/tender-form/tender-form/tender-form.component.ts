import { ItemDTO } from 'src/app/interface/item-interface';
import { ItemAPI } from 'src/app/api/item/item-api';
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
  items: ItemDTO[] = [];

  tender: TenderDTO = {
    id: 0,
    description: ''
  };

  isLoaded: boolean = false;
  isRating:boolean=false;

  canCreate:boolean=false;
  canUpdate:boolean=false;
  canDelete:boolean=false;
  canSumUp:boolean=false;

  constructor(private tenderApi: TenderAPI, private route: ActivatedRoute,
    private tenderFormApi: TenderFormAPI,
    private itemApi: ItemAPI,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.tenderId = this.route.snapshot.params['tenderId'];
    this.checkPermission();
    this.getAllTenderFormByTenderId(this.tenderId);
    this.getTenderById(this.tenderId);
    this.getAllRatedItemsByTenderId(this.tenderId);
  }

  checkPermission(){
    if(localStorage.getItem("role")==='ROLE_AGENCY_USER'){
      this.canCreate=true;
      this.canUpdate=true;
      this.canDelete=true;
    }else if(localStorage.getItem("role")!=='ROLE_AGENCY_USER'){
      this.canSumUp=true;
    }
  }

  getAllRatedItemsByTenderId(tenderId: number) {
    this.itemApi.getAllByTenderId(tenderId)
      .then(res => {
        console.log(res);
        this.items = res.data.data;

      }).catch(error => {
        console.log(error);
        // this.messageService.add({
        //   severity: "error",
        //   summary: error.response.status,
        //   detail: error.response.data.message
        // });
      })
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

  calculateTotalRate(): number {
    let cost: number = this.items
      .reduce(function (a, b) {
        return a + b.rate;
      }, 0);
    return cost;
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

  sumUpRate(tenderId: number) {
    this.isRating=true;
    this.itemApi.rateSumUpTender(tenderId)
      .then(res => {
        console.log(res);
        this.messageService.add({
          severity: "success",
          summary: "" + res.status,
          detail: res.data.message
        });
        this.isRating=false;
      }).catch(error => {
        console.log(error);
        this.messageService.add({
          severity: "error",
          summary: error.response.status,
          detail: error.response.data.message
        });
        this.isRating=false;
      })
  }

}
