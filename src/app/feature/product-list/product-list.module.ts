import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared.module";
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { SelectCategoryComponent } from './select-category/select-category.component';
import { ProductListItemsComponent } from './product-list-items/product-list-items.component';


@NgModule({
  declarations: [ProductListComponent, SelectCategoryComponent, ProductListItemsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductListRoutingModule,
    SharedModule
  ]
})
export class ProductListModule { }
