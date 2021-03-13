import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from "../../shared.module";
import {AuthService} from "./auth.service";


@NgModule({
  declarations: [AuthComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[RouterModule]
  
})
export class AuthModule { }
