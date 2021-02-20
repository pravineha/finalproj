import { Component, OnInit,Input } from '@angular/core';
import {groupMeasurementByName} from "src/app/utility";

@Component({
  selector: 'app-product-list-items',
  templateUrl: './product-list-items.component.html',
  styleUrls: ['./product-list-items.component.css']
})
export class ProductListItemsComponent implements OnInit {

  @Input() product:any;
  measureMentList = [];
  selectedMeasureIndex = 0;
  constructor() { }

  ngOnInit(): void {
    console.clear();
   console.log(this.product);
   console.log()

   const measurementGroup = groupMeasurementByName(this.product.measurements);
    
    measurementGroup.subscribe((val) => {
      this.measureMentList = [...this.measureMentList,val];
    })
    console.log("MeasurementGrou",this.measureMentList)
  }

  measureChanged(value){
      this.selectedMeasureIndex = value;
  }

  

}
