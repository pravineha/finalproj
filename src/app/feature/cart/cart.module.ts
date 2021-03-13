import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import {SharedModule} from "../../shared.module";
import { CartListComponent } from './cart-list/cart-list.component';


@NgModule({
  declarations: [CartComponent, CartListComponent],
  imports: [
    CommonModule,
    FormsModule,
    CartRoutingModule,
    SharedModule
  ],
  providers:[]
})
export class CartModule { }
