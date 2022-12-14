import { ItemCreateDTO } from 'src/app/interface/item-interface';
import { ItemComponent } from './../../item.component';
import { ItemAPI } from 'src/app/api/item/item-api';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

  @Input()
  tenderFormId!: number;


  itemForm!: FormGroup;
  isSaving: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private itemApi: ItemAPI,
    private itemComponent: ItemComponent,
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
    const val = this.itemForm.value;

    if (val.name && val.description && this.tenderFormId && val.quantity > 0) {
      let dto: ItemCreateDTO = {
        name: val.name,
        description: val.description,
        quantity: val.quantity,
        tenderFormId: this.tenderFormId
      }

      this.itemApi.create(dto)
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
          this.itemComponent.getAllByTenderFormId(this.tenderFormId);
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
          + (!val.description ? " Required Description" : ' ') + (val.quantity == 0 ? " Required Quantity" : '')
      });
    }

  }


  initializeForm() {
    this.itemForm = this.formBuilder.group({

      name: ['', Validators.required],

      description: ['', Validators.required],

      quantity: [0, Validators.required]

    });
  }

}
