import { TenderDTO } from './../../../../../interface/tender-interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tender-view',
  templateUrl: './tender-view.component.html',
  styleUrls: ['./tender-view.component.css']
})
export class TenderViewComponent implements OnInit {


  constructor() { }



  @Input()
  tender: TenderDTO = {
    id: 0,
    description: ''
  };




  ngOnInit(): void {
  }

  displayModal!: boolean;
  showModalDialog() {
    this.displayModal = true;
  }


}
