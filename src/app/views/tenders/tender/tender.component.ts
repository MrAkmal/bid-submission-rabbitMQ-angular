import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { TenderDTO, TenderCreateDTO, TenderUpdateDTO } from './../../../interface/tender-interface';
import { TenderAPI } from './../../../api/tender/tender-api';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css']
})
export class TenderComponent implements OnInit {

  tenders: TenderDTO[] = [];

  msgs: Message[] = [];


  createForm: FormGroup;

  displayModal: boolean = false;

  constructor(private fb: FormBuilder,private tenderApi: TenderAPI, private messageService: MessageService) {
    this.createForm = this.fb.group({
      id: '',
      description: ''
    });
   }

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

  no(){
    this.messageService.clear('c');
    this.messageService.add({
      severity: 'warn', summary:  "Cancelled", detail: "Operation cancelled"
    });
  }

  create(){
    const val = this.createForm.value;

    let dto: TenderCreateDTO = {
      description: val.description
    };

    this.tenderApi.create(dto)
    .then(res=>{

      console.log('status = ' + res.status)

      this.messageService.add({
        severity: 'success', summary: res.status + "", detail: res.data.message
      });
      this.getAllTender();
      this.displayModal = false;
    }).catch(err=>{

      this.messageService.add({
        severity: 'error', summary: ''+err.response.status, detail: err.response.data.message
      });

      this.displayModal = false;

    });
  }



  update(){

    const val = this.createForm.value;

    let dto: TenderUpdateDTO = {
      id: val.id,
      description: val.description
    };

    this.tenderApi.update(dto)
    .then(res=>{

      console.log('status = ' + res.status)

      this.messageService.add({
        severity: 'success', summary: res.status + "", detail: res.data.message
      });
      this.getAllTender();
      this.displayModal = false;
    }).catch(err=>{

      this.messageService.add({
        severity: 'error', summary: ''+err.response.status, detail: err.response.data.message
      });

      this.displayModal = false;

    });
  }

  delete(tenderId: number){

    this.messageService.clear('c')
    this.tenderApi.delete(tenderId)
    .then(res=>{

      console.log('status = ' + res.status)

      this.messageService.add({
        severity: 'success', summary: res.status + "", detail: res.data.message
      });
      this.getAllTender();
      this.displayModal = false;
    }).catch(err=>{

      this.messageService.add({
        severity: 'error', summary: ''+err.response.status, detail: err.response.data.message
      });

      this.displayModal = false;

    });

  }

  getTender(){
    const val = this.createForm.value;

    let tenderId = val.id;

    this.tenderApi.getTenderById(tenderId)
    .then(res=>{

      console.log('status = ' + res.status)

      this.messageService.add({
        severity: 'success', summary: res.status + "", detail: res.data.message
      });
      this.getAllTender();
      this.displayModal = false;
    }).catch(err=>{

      this.messageService.add({
        severity: 'error', summary: ''+err.response.status, detail: err.response.data.message
      });

      this.displayModal = false;

    });
  }

  showModalDialog() {
    this.displayModal = true;
  }


  deleteModal: boolean = false;

  
  showdeleteModal(tenderId:number){
    
    this.messageService.clear();
    this.messageService.add({
      key: 'c', sticky: true,
      severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed', id: tenderId
    });


  }

}


