import { NgModule } from '@angular/core';
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
    ProductListRoutingModule,
    SharedModule
  ]
})
export class ProductListModule { }
