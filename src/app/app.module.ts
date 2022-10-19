import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

//componenets
import { AppComponent } from './app.component';
import { TenderComponent } from './views/tenders/tender/tender.component';
import { NavbarComponent } from './views/navbar/navbar/navbar.component';

//primeNg
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import {CardModule} from 'primeng/card';
import {SkeletonModule} from 'primeng/skeleton';
import {BadgeModule} from 'primeng/badge';
import {EditorModule} from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';

import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { TenderViewComponent } from './views/tenders/tender/view/tender-view/tender-view.component';
import { TenderCreateComponent } from './views/tenders/tender/create/tender-create/tender-create.component';
import { TenderUpdateComponent } from './views/tenders/tender/update/tender-update/tender-update.component';
import { TenderFormComponent } from './views/tender-form/tender-form/tender-form.component';
import { TenderFormCreateComponent } from './views/tender-form/tender-form/create/tender-form-create/tender-form-create.component';
import { TenderFormUpdateComponent } from './views/tender-form/tender-form/update/tender-form-update/tender-form-update.component';
import { TenderFormViewComponent } from './views/tender-form/tender-form/view/tender-form-view/tender-form-view.component';
import { ItemComponent } from './views/item/item/item.component';
import { ItemViewComponent } from './views/item/item/view/item-view/item-view.component';
import { ItemCreateComponent } from './views/item/item/create/item-create/item-create.component';
import { ItemUpdateComponent } from './views/item/item/update/item-update/item-update.component';
import { AuthComponent } from './views/auth/auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    TenderComponent,
    NavbarComponent,
    TenderViewComponent,
    TenderCreateComponent,
    TenderUpdateComponent,
    TenderFormComponent,
    TenderFormCreateComponent,
    TenderFormUpdateComponent,
    TenderFormViewComponent,
    ItemComponent,
    ItemViewComponent,
    ItemCreateComponent,
    ItemUpdateComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,


    MenubarModule,
    TableModule,
    ButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
