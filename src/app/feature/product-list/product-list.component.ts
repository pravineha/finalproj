import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  industryid="";
  bussinessid="";
  categoryList=[];
  sectionList=[];
  productList=[];
  catSectionId;
  bussinessDetails = {name:"",location:"N/A",city:"N/A"};
  constructor(private apollo: Apollo,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.industryid = params['industryid'];
      this.bussinessid = params['bussinessid']
    });
    console.log("INdustryID",this.industryid);
    console.log("bussinessid",this.bussinessid);
    console.log("bussinessid",this.bussinessDetails);
    const query = `
    {
      getCategoryByBID(bussinessid:"${this.bussinessid}"){
        name,
        id,
        createdDate,
        bussinessId,
        sectionList{
          name,
          id
        }
        bussinessDetails{
          name,
          img,
          location,
          city
        }
      }
    }`
    this.apollo
    .watchQuery({
      query: gql`${query}`
    }).valueChanges.subscribe((result:any) => {
      console.log("RESULT",result);
      this.categoryList = [];
      if(result && result.data && result.data.getCategoryByBID){
          this.categoryList = result.data.getCategoryByBID;
          console.log("CategoryList",this.categoryList);
          this.bussinessDetails =this.categoryList[0] ? this.categoryList[0].bussinessDetails : this.bussinessDetails;
      }
      
    })
  }
  onChangeCategory(catSelectedId){
    this.catSectionId = catSelectedId;
    console.log(catSelectedId)
    this.productList =[];
    //this.categoryChange.emit(catSelectedId)
    if(catSelectedId){
      const selectedCategory =  this.categoryList.find(cat => cat.id == catSelectedId);
      if(selectedCategory){
        this.sectionList = selectedCategory.sectionList;
        console.log(this.sectionList);

      }
    }
  }

  onChangeSelection(catSectionId){
    console.log(catSectionId)
    const query = `
    {
      getProductBySectionId(sectionid:"${catSectionId}"){
         id,
          name,
          createdDate,
          sectionId,
          img,
          measurements{
            name,
            sizename,
            size
          }
      }
    }`
    this.apollo
    .watchQuery({
      query:gql`${query}`
    }).valueChanges.subscribe((result:any)=>{
      console.log("Product LIST",result);
      if(result && result.data && result.data.getProductBySectionId){
          this.productList = result.data.getProductBySectionId;
      }
    })
  }

}
