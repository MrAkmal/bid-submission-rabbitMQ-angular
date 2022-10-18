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


@NgModule({
  declarations: [
    AppComponent,
    TenderComponent,
    NavbarComponent
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
