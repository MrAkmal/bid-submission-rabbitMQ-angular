import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ItemAPI } from 'src/app/api/item/item-api';
import { ItemCreateDTO, ItemRateCreateDTO } from 'src/app/interface/item-interface';
import { ItemComponent } from '../../item.component';

@Component({
  selector: 'app-item-rate',
  templateUrl: './item-rate.component.html',
  styleUrls: ['./item-rate.component.css']
})
export class ItemRateComponent implements OnInit {

  @Input()
  itemId!: number;

  @Input()
  tenderFormId!: number;


  rateForm!: FormGroup;
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
    const val = this.rateForm.value;

    if (val.rate) {
      let dto: ItemRateCreateDTO = {
        itemId: this.itemId,
        rate: val.rate
      }

      this.itemApi.rateItem(dto)
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
        detail: (!val.name ? "Required Rate" : ' ')
      });
    }

  }


  initializeForm() {
    this.rateForm = this.formBuilder.group({

      rate: [0, Validators.required]

    });
  }

}
