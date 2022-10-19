import { TenderFormDTO } from './../../../interface/tender-form-interface';
import { TenderAPI } from './../../../api/tender/tender-api';
import { TenderDTO } from './../../../interface/tender-interface';
import { ItemDTO } from './../../../interface/item-interface';
import { Component, OnInit } from '@angular/core';
import { ItemAPI } from 'src/app/api/item/item-api';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TenderFormAPI } from 'src/app/api/tender-form/tender-form-api';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  tenderFormId: number = 1;

  isLoaded: boolean = false;

  tenderFormItems: ItemDTO[] = [];

  tenderForm: TenderFormDTO = {
    id: 0,
    name: ''
  };

  constructor(private itemApi: ItemAPI,
    private route: ActivatedRoute,
    private router: Router,
    private tenderFormApi: TenderFormAPI,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.getAllByTenderFormId(this.tenderFormId);
    this.getTenderFormById(this.tenderFormId);
  }

  getTenderFormById(tenderFormId: number) {
    this.tenderFormApi.getById(tenderFormId)
      .then(res => {
        console.log(res);
        this.tenderForm = res.data.data;
        this.isLoaded = true;
      }).catch(err => {
        console.log(err);
        this.messageService.add({
          severity: "error",
          summary: err.response.data.status,
          detail: err.response.data.message
        });
        this.router.navigate(['/tender']);
      })
  }

  getAllByTenderFormId(tenderFormId: number) {
    this.itemApi.getAllByTenderFormId(tenderFormId)
      .then(res => {
        console.log(res);
        this.tenderFormItems = res.data.data;
      }).catch(err => {
        console.log(err);
      })
  }

  delete(itemId: number) {

    this.messageService.clear('c');

    this.itemApi.delete(itemId)
      .then((res) => {
        this.messageService.add({
          severity: "error",
          summary: "" + res.status,
          detail: res.data.message
        });
        this.getAllByTenderFormId(this.tenderFormId);
      }).catch((error: any) => {
        console.log(error);
        this.messageService.add({
          severity: "error",
          summary: error.response.status,
          detail: error.response.data.message
        });
        this.getAllByTenderFormId(this.tenderFormId);
      });
  }

  showConfirm(itemId: number) {
    this.messageService.clear();
    this.messageService.add({
      key: 'c', sticky: true,
      severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed', id: itemId
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
