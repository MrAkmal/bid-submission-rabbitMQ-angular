export interface ItemDTO {

  id: number;

  name: string;

  description: string;

  quantity: number;

  rate: number;

}


export interface ItemCreateDTO {

  name: string;

  description: string;

  quantity: number;

  tenderFormId: number;

}

export interface ItemUpdateDTO {

  id: number;

  name: string;

  description: string;

  quantity: number;

  tenderFormId: number;

}


export interface ItemRateCreateDTO {

  itemId: number;

  rate: number;

}

export interface ItemRateDetailDTO {

  bidderUserName: string;
  rate: number;

}
