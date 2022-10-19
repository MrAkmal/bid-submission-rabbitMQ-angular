import { ItemAPI } from 'src/app/api/item/item-api';
import { Component, Input, OnInit } from '@angular/core';
import { ItemDTO, ItemRateDetailDTO } from 'src/app/interface/item-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ItemComponent } from '../../item.component';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {

  tenderFormId!: number;

  itemId!: number;

  itemRates: ItemRateDetailDTO[] = []



  item: ItemDTO = {
    id: 0,
    name: '',
    description: '',
    quantity: 0,
    rate: 0
  };

  isLoaded: boolean = false;

  constructor(private itemApi: ItemAPI,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['itemId'];
    this.tenderFormId = this.route.snapshot.params['tenderFormId'];
    this.getItemById(this.itemId);
    this.getAllItemRateByItemId(this.itemId);
  }


  getItemById(itemId: number) {
    this.itemApi.getById(itemId)
      .then(res => {

        console.log(res);
        this.item = res.data.data;
        this.isLoaded = true;
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


  getAllItemRateByItemId(itemId: number) {
    this.itemApi.getAllItemRateByItemId(itemId)
      .then(res => {
        this.itemRates = res.data.data;
      }).catch(err => {
        console.log(err);
      })
  }

}
