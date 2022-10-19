import { TenderAPI } from './../../../api/tender/tender-api';
import { TenderFormAPI } from 'src/app/api/tender-form/tender-form-api';
import { TenderFormDTO } from './../../../interface/tender-form-interface';
import { Component, Input, OnInit } from '@angular/core';
import { TenderDTO } from 'src/app/interface/tender-interface';
import { ActivatedRoute } from '@angular/router';


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
    private tenderFormApi: TenderFormAPI) { }

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

}
