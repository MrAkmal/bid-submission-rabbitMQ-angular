import { TenderFormDTO } from './../../../../../interface/tender-form-interface';
import { ItemComponent } from './../../item.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ItemAPI } from 'src/app/api/item/item-api';
import { ItemDTO, ItemUpdateDTO } from 'src/app/interface/item-interface';
import { TenderFormAPI } from 'src/app/api/tender-form/tender-form-api';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.css']
})
export class ItemUpdateComponent implements OnInit {


  @Input()
  tenderFormId!: number;


  @Input()
  tenderId!: number;

  @Input()
  itemId!: number;

  tenderForms: TenderFormDTO[] = [];

  item: ItemDTO = {
    id: 0,
    name: '',
    description: '',
    quantity: 0,
    rate: 0
  };

  itemForm!: FormGroup;

  name!: string;
  description!: string;
  quantity!: number;
  tenderFormIds:number=0;

  isUpdating: boolean = false;
  isLoaded: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private itemApi: ItemAPI,
    private router: Router,
    private route: ActivatedRoute,
    private itemComponent: ItemComponent,
    private tenderFormApi: TenderFormAPI,
    private messageService: MessageService) {
      this.initializeForm();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getItemById(this.itemId);
    this.getAllTenderFormByTenderId(this.tenderId);
  }


  displayModal!: boolean;
  showModalDialog() {
    this.displayModal = true;
  }


  getItemById(itemId: number) {
    this.itemApi.getById(itemId)
      .then(res => {

        console.log(res);
        this.item = res.data.data;

        this.name = this.item.name;
        this.description = this.item.description;
        this.quantity = this.item.quantity;
        this.isLoaded = true;
        this.tenderFormIds=this.tenderFormId;

      }).catch(err => {
        console.log(err);
        this.messageService.add({
          severity: "error",
          summary: err.response.data.status,
          detail: err.response.data.message
        });
        this.router.navigate(['/tender/view/' + this.tenderFormId + '/item']);
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

  update() {

    this.isUpdating = true;
    const val = this.itemForm.value;

    if (val.name && val.description && val.tenderFormId && val.quantity > 0) {

      let dto: ItemUpdateDTO = {
        name: val.name,
        description: val.description,
        quantity: val.quantity,
        tenderFormId: val.tenderFormId,
        id: this.itemId
      }

      this.itemApi.update(dto)
        .then(res => {
          console.log(res);
          this.displayModal = false;
          this.messageService.add({
            severity: "info",
            summary: '' + res.status,
            detail: res.data.message
          });
          this.isUpdating = false;
          this.itemComponent.getAllByTenderFormId(this.tenderFormId);
        }).catch(err => {
          console.log(err);
          if (err.response) {
            this.messageService.add({
              severity: "error",
              summary: err.response.status,
              detail: err.response.data.message
            });
            this.isUpdating = false;
          } else {
            this.messageService.add({
              severity: "error",
              summary: "Unknown",
              detail: "Unknown Error"
            });
            this.isUpdating = false;
          }
        })
    } else {
      this.isUpdating = false;
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

      quantity: [0, Validators.required],

      tenderFormId: ['', Validators.required]

    });
  }

}
