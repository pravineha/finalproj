import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/service/auth.service"
import {Apollo,ApolloBase,gql} from "apollo-angular"
import {Router} from "@angular/router";
import { onError } from "@apollo/client/link/error";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cartProducts;
  orderCreated:boolean = false;
  orderCallMessage:string;
  private apollo:ApolloBase;
  createOrderQ = gql`
  mutation createOrder(
   $productList:[any],

  ){
    createOrder(productList:$productList){
      id
    }
  }
  `

  constructor(private auth:AuthService, private appolloProvider:Apollo,private router:Router) {
    this.apollo = this.appolloProvider.use("loggedInUser")
    console.log("APPOLO",this.apollo);
   }

  ngOnInit(): void {
    this.cartProducts = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):null;
    console.log("CARTPRODUCT",this.cartProducts);
  }
  checkout(){
    const authStatus = this.auth.getAuthStatus();
    if(authStatus){
      console.log("AUTH");
    this.createOrder();
    }else{
      this.router.navigate(['/auth'])
    }
  }

  home(){
    this.router.navigate(['/home'])
  }

  createProductList(){
    const StoredproductList =  JSON.parse(localStorage.getItem("cart"));
    if(StoredproductList && StoredproductList.length > 0){
      let storedProductLIst =  StoredproductList.map(product => {
            return {
              productId:product.id,
              measurements:[...product.measurements],
              quantity:product.quantity,
              createdFor:product.createdFor,
              address:product.address
            }
      })
        let formedQueryList= ''
      storedProductLIst.map(product => {
        let measurementString = ''
        product.measurements.map(measurement => {
          measurementString += `{
            name:"${measurement.name}",
          size:"${measurement.size}",
          sizename:"${measurement.sizename}"
        },`
        })
        formedQueryList += `{ 
          productId:"${product.productId}",
          quantity:${product.quantity}
          createdFor:"${product.createdFor}",
          measurements:[${measurementString}]
          address:"${product.address}"
        },`   
      })
      return formedQueryList;

    }
    return [];
   
  }

  createOrder(){
    try{
        const productList = this.createProductList() ;
        console.log("PRODUCTLIST fdfgfg",productList)
        
        this.apollo
        .watchQuery({
          query: gql`
          {
          createOrder(
          productList:[${productList}]){
            id
          }
        }
          `,
        }).valueChanges.subscribe((result:any) => {
        if(!result.data || (result.data &&  result.data.errorCode == 403)){
          this.router.navigate(['/auth'])
        }else if(result.data && !result.data.errorCode){
          console.log("Order",result)
          //alert("")
          this.orderCreated = true;
          this.orderCallMessage = `Thank you ! Order created successfully orderID ${result.data.createOrder.id}`;
          localStorage.removeItem("cart")
        }else{
            this.orderCreated = false;
            this.orderCallMessage = "Order not created";
            
        }
      })
    }catch(err){
        console.log("ERR",err);
        alert("Problem in order creations")
    }
    
  }



}
