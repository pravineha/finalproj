import { Component, OnInit,Input } from '@angular/core';
import {groupMeasurementByName} from "src/app/utility";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  @Input() product:any;
  public measureMentList = [];
  selectedMeasureIndex = 0;
  public selectedMeasures=[];
  quantity=1;
  checkCart=false;
  oldCheckCart = false;
  productinCart=false;
  createdFor="self";
  address="self";
  constructor() { }

  ngOnInit(): void {
    // console.clear();
   // console.log(this.product);
   // console.log()

   const measurementGroup = groupMeasurementByName(this.product.measurements);
    
    measurementGroup.subscribe((val) => {
      this.measureMentList = [...this.measureMentList,val];
    })
    // console.log("MeasurementGrou",this.measureMentList)
   // this.selectedMeasures=[...this.measureMentList[0]];
   const selectedSizeMeasure = this.measureMentList[this.selectedMeasureIndex];
    const selectedMeasures = selectedSizeMeasure.map(measurement => {
      const {name,sizename,size}= measurement;
      return {name,sizename,size};
    });
    this.selectedMeasures = selectedMeasures;
    this.checkCart= !this.checkCart;
  }

  ngDoCheck(){
    if(this.oldCheckCart !== this.checkCart){
      let cartItem = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):null;
      if(cartItem){
       const cartexisitng =  cartItem.findIndex(cart => {
         if(cart){
           return cart.id == this.product.id
         }
       });
       if(cartexisitng >=0){
            this.productinCart = true;
       }else{
        this.productinCart = false;
       }
      }else{
        this.productinCart = false;
      }
      this.oldCheckCart = this.checkCart;
    }
  }

  measureChanged(value){
      this.selectedMeasureIndex = value;
      // this.selectedMeasures = this.measureMentList[value].filter(measurement => {
      //   const {name,sizename,size}= measurement;
      //   return {name,sizename,size};
      // })
      // // console.log("MeasurementGrou", this.selectedMeasures)
  }
  updateMeasurement(event, measureIndex){
    // console.log("VALUE",event.target.value,"MEASUREMENT",measureIndex);
    // console.log("MEASUREMENT", this.selectedMeasures);
    // console.log("MEASUREMNT INDEX",this.measureMentList);
    const selectedSizeMeasure = this.measureMentList[this.selectedMeasureIndex];
    const selectedMeasures = selectedSizeMeasure.map(measurement => {
      const {name,sizename,size}= measurement;
      return {name,sizename,size};
    });
    selectedMeasures[measureIndex].size =event.target.value;
    this.selectedMeasures = selectedMeasures;
    // console.log("MeasurementGrou", selectedMeasures);
    this.addToCart();
  }
  addToCart(){
   //  // console.log("id",prodId);
       console.log("NAME",this.createdFor);
    if(this.quantity >0){
      const {id,name,img}  = this.product;
      let cartObject = {id,img,name,quantity:this.quantity};
      cartObject["measurements"] = this.selectedMeasures;
      // console.log("Measurement Index",cartObject);
      let cartItem = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):null;
      if(cartItem){
       const cartexisitng =  cartItem.findIndex(cart => {
         if(cart){
           return cart.id == id
         }
       });
       if(cartexisitng  >= 0){
        cartItem[cartexisitng].quantity = this.quantity;
        cartItem[cartexisitng].measurements = cartObject["measurements"];
        cartItem[cartexisitng].createdFor= this.createdFor;
        cartItem[cartexisitng].address = this.address;
       }else{
        cartItem = [...cartItem,...[cartObject]];
       }
      }else{
        cartItem = [cartObject]
      }
      localStorage.setItem("cart",JSON.stringify(cartItem));
      this.checkCart= !this.checkCart;
    }else{
      this.removecart();
    }
  }

  removecart(){
    let cartItem = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):null;
    const {id,name,img}  = this.product;
    if(cartItem){
      const cartexisitng =  cartItem.findIndex(cart => {
        if(cart){
          return cart.id == id
        }
      });
      if(cartexisitng >= 0){
        cartItem = cartItem.splice(0,cartexisitng)
      }

      localStorage.setItem("cart",JSON.stringify(cartItem));
      this.checkCart= !this.checkCart;
    }
  }

}
