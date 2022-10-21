import { NotificationComponent } from './views/notification/notification/notification.component';
import { NotificationDetailComponent } from './views/notification/notification/notification-detail/notification-detail/notification-detail.component';
import { AuthComponent } from './views/auth/auth/auth.component';
import { TenderFormComponent } from './views/tender-form/tender-form/tender-form.component';
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
    path: "tender",
    component: TenderComponent
  },
  {
    path: "tender/view/:tenderId",
    component: TenderFormComponent
  },
  {
    path: "tender/view/:tenderId/:tenderFormId/item",
    component: ItemComponent
  },
  {
    path: "item/view/:tenderId/:tenderFormId/:itemId",
    component: ItemViewComponent
  },
  {
    path: "notification/view/:tenderId/:bidderId",
    component: NotificationDetailComponent
  },
  {
    path: "notification",
    component: NotificationComponent
  },
  {
    path: "login",
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
