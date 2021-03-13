import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import {Apollo,ApolloBase,gql} from "apollo-angular";
import {Router} from "@angular/router";
import {validateEmail} from "src/app/utility";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:string;
  password:string;
  name:string;
  SignupForm:FormGroup;
  signupMessage:string;
  constructor(private apollo:Apollo,private router:Router) { 
    
  }

  ngOnInit(): void {
    this.SignupForm = new FormGroup({
      'username':new FormControl("",[Validators.required]),
      'email':new FormControl("",[Validators.required,Validators.email]),
      'mobile':new FormControl("",[Validators.required, Validators.pattern("[0-9 ]{10}")]),
      'password' : new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(12)])
    });

    console.log("SIGNUPFORK",this.SignupForm)
  }

  onSubmit(){
    try{
      console.log(this.SignupForm);
      const {username,email,mobile,password}= this.SignupForm.value;
      this.apollo
          .watchQuery({
            query:gql`
            {
              userSignup(
              name:"${username}",
              mobile:"${mobile}",
              email:"${email}",
              password:"${password}"){
                id
              }
            }
            `
          }).valueChanges.subscribe((resp)=>{
              console.log("RESPONSE",resp)
              if(resp.data && resp.data["userSignup"]){
                this.signupMessage = "user created successfully Please navigate to login page"
               // this.router.navigate(['/auth'])
              }
          })
    }catch(error){
        alert("No signup");
        console.log("ERROR",error)
    }
  
  }
 


}
