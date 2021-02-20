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
  constructor(private apollo: Apollo,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.industryid = params['industryid'];
      this.bussinessid = params['bussinessid']
    });
    console.log("INdustryID",this.industryid);
    console.log("bussinessid",this.bussinessid);
    const query = `
    {
      getCategoryByBID(bussinessid:${this.bussinessid}){
        name,
        id,
        createdDate,
        bussinessId,
        sectionList{
          name
        }
    
    }
    }`
    this.apollo
    .watchQuery({
      query: gql`${query}`
    }).valueChanges.subscribe((result) => {
      console.log("RESULT",result);
    })
  }

}
