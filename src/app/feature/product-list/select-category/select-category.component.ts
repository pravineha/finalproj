import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit {

  @Input() categoryList =[];
  @Input() sectionList = [];
  @Output() categoryChange = new EventEmitter<any>();
  @Output() sectionChange = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  
  onChangeCategory(catSelectedId){
    console.log(catSelectedId)
    this.categoryChange.emit(catSelectedId);
  }

  onChangeSection(selectionId){
    console.log("selectionId",selectionId)
    this.sectionChange.emit(selectionId);
  }

}
