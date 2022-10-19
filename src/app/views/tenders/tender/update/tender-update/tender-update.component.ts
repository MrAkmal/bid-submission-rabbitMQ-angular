import { TenderAPI } from './../../../../../api/tender/tender-api';
import { TenderComponent } from './../../tender.component';
import { TenderDTO, TenderUpdateDTO } from './../../../../../interface/tender-interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tender-update',
  templateUrl: './tender-update.component.html',
  styleUrls: ['./tender-update.component.css']
})
export class TenderUpdateComponent implements OnInit {


  @Input()
  tender!: TenderDTO;

  description!: string;

  updateForm: FormGroup;


  constructor(private tenderApi:TenderAPI,private tenderComponent: TenderComponent,private fb: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService) {

    this.updateForm = this.fb.group({
      id: '',
      description: ''
    });
  }

  ngOnInit(): void {
    this.description=this.tender.description;
  }


  


  displayModal!: boolean;
  showModalDialog() {
    this.displayModal = true;
  }


  update(){

    const val = this.updateForm.value;

    let dto: TenderUpdateDTO = {
      id: this.tender.id,
      description: val.description
    };

    this.tenderApi.update(dto)
    .then(res=>{

      console.log('status = ' + res.status)

      this.messageService.add({
        severity: 'success', summary: res.status + "", detail: res.data.message
      });
      this.tenderComponent.getAllTender();
      this.displayModal = false;
    }).catch(err=>{

      this.messageService.add({
        severity: 'error', summary: 'salom ' + err.response.status, detail: err.response.data.message
      });

      this.displayModal = false;

    });
  }

  no(){
    this.tenderComponent.no();
    this.displayModal = false;
  }

}
