import { TenderAPI } from './../../../../../api/tender/tender-api';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TenderCreateDTO } from 'src/app/interface/tender-interface';
import { TenderComponent } from '../../tender.component';

@Component({
  selector: 'app-tender-create',
  templateUrl: './tender-create.component.html',
  styleUrls: ['./tender-create.component.css']
})
export class TenderCreateComponent implements OnInit {


  createForm: FormGroup;



  constructor(private fb: FormBuilder, private messageService: MessageService,private tenderApi: TenderAPI,private tenderComponent: TenderComponent) {
    this.createForm = this.fb.group({
      id: '',
      description: ''
    });
   }

  ngOnInit(): void {
  }



  displayModal!: boolean;
  showModalDialog() {
    this.displayModal = true;
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
      this.tenderComponent.getAllTender();
      this.displayModal = false;
    }).catch(err=>{

      this.messageService.add({
        severity: 'error', summary: ''+err.response.status, detail: err.response.data.message
      });

      this.displayModal = false;

    });
  }


}
