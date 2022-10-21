export interface NotificationDTO {

  totalRate: number;

  bidderId: number;

  tenderId: number;

  click:boolean;

  submissionDateTime: string;

}


export interface NotificationClickDTO{
  bidderId:number;
  tenderId:number;
}
