import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component"
;
@NgModule({
  declarations: [FooterComponent,FooterSmallComponent,AuthNavbarComponent],
  imports: [
    CommonModule
  ],
  exports:[RouterModule,FooterComponent,FooterSmallComponent,AuthNavbarComponent]
})
export class SharedModule { }
