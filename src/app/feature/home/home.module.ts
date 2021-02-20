import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {SharedModule} from "../../shared.module";
import { Routes, RouterModule } from "@angular/router";
import { ClientListComponent } from './client-list/client-list.component';
@NgModule({
  declarations: [HomeComponent, ClientListComponent],
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule,
  ],
  exports:[]
})
export class HomeModule { }
