import { ItemViewComponent } from './views/item/item/view/item-view/item-view.component';
import { ItemComponent } from './views/item/item/item.component';
import { TenderComponent } from './views/tenders/tender/tender.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'tender', pathMatch: 'full'
  },
  {
    path:"tender",
    component:TenderComponent
  },
  {
    path:"tender/view/:tenderFormId/item",
    component:ItemComponent
  },
  {
    path:"item/view/:tenderFormId/:itemId",
    component:ItemViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
