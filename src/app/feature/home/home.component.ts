import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ClientListComponent} from "./client-list/client-list.component"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  industryList:any;
  industryListFetch = 0;
  constructor(private apollo: Apollo,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            industries{
              name,
              createdDate,
              id
            }
          }
        `,
      }).valueChanges.subscribe((result:any) => {
        console.log("RESULT",result)
        if(result.data && result.data.industries){
          this.industryList = result.data.industries;
          this.industryListFetch = 1;
        }else{
          this.industryListFetch = -1;
        }
      })
  }

  openClientList(industryId,industryName){
  
    const clientmodal = this.modalService.open(ClientListComponent, { size: 'lg' });
    clientmodal.componentInstance.industryId =industryId;
    clientmodal.componentInstance.industryName = industryName;

    
  }

}
