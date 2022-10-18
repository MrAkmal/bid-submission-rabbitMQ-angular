import { TenderDTO } from './../../../interface/tender-interface';
import { TenderAPI } from './../../../api/tender/tender-api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css']
})
export class TenderComponent implements OnInit {

  tenders: TenderDTO[] = [];

  constructor(private tenderApi: TenderAPI) { }

  ngOnInit(): void {
    this.getAllTender();
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

  
}
