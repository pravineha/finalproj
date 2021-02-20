import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  @Input() industryId;
  @Input() industryName = "Industry";
  bussinessList;
  bussinessListFetch =0;
  @Output() selectedClientId:EventEmitter<any> = new EventEmitter();

  constructor(private apollo: Apollo,private router:Router,private modalService: NgbModal) { }

  ngOnInit(): void {
    
    const industryId = this.industryId.toString();
    const query = `{
      getBussinessesById(industryId:"${industryId}"){
        name,
        id,
        createdDate,
        industryId,
    		img,
    		location,
        phoneNumber,
   			city
    
    }
    }`
    this.apollo
    .watchQuery({
      query: gql`${query}`
    }).valueChanges.subscribe((result:any) => {
     // console.log("RESULT",result)
      if(result && result.data && result.data.getBussinessesById){
        this.bussinessList = result.data.getBussinessesById;
        this.bussinessListFetch = 1;
      }else{
        this.bussinessListFetch = -1;
      }
       
    })
  }

   navToProductList(_bussinessId: any){
    this.modalService.dismissAll()
    this.router.navigate(['/productList',this.industryId,_bussinessId]);
   }

}
