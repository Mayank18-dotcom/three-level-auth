import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
export class User {
  public fullname : any;
  public username: any;
  public email : any;
  public passcode: any;
  public passphrase: any;
  public designation: any;
  public dob : any;
  public phno : any;
  public level : any;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerUserData = new User();
  loader = false;
  value : any;
  checkmail=/^([a-z 0-9 \.-]+)@([a-z 0-9 -]+).([a-z]{2,8})(.[a-z]{2,8})?$/;
  checkPhno = /^\d{10}$/;
  constructor(private service:AppService,public router:Router) { }

  ngOnInit() {
    this.value = Math.floor(1000 + Math.random() * 9000);
    this.registerUserData.passcode = this.value;
  }
  checkRegno(str) {
    var re = /^[0-9]{10,10}$/;
    return re.test(str);
  }
  registerUser(){
    this.loader = true;
    setTimeout(()=>{
      this.service.signup(this.registerUserData)
      .subscribe(
        (res:any) =>{
          window.localStorage.setItem('token',res.token)
          window.localStorage.setItem('id', JSON.stringify(res.user._id))
          window.localStorage.setItem('un', JSON.stringify(res.user.username))
          setTimeout(() => {
            this.router.navigate(['/user/',res.user.username])
            this.loader = false;
            // this.spinner.hide();
          }, 4000);
        },
        (err)=>{
          if(err instanceof HttpErrorResponse){
            if(err.status === 400){
              console.log(err)
              alert("Username already exists!");
              this.loader = false;
              // this.spinner.hide();
            }
          }
        }
      )
    },1000)
  }
  check(){
    var ph = (this.registerUserData.phno).toString();
    console.log(ph);
    if (this.registerUserData.username == null || this.registerUserData.username.length <= 5 ){
      alert("Please provide username with length greater than 5 characters")
    }else if(this.registerUserData.email==null || this.checkmail.test(this.registerUserData.email)==false){
      alert("Email is of wrong format")
    }
    else if(this.registerUserData.level == null){
      alert("Please select a level")
    }
    else if(this.registerUserData.fullname == null){
      alert("Please enter Fullname")
    }
    else if(this.registerUserData.designation == null){
      alert("Please enter designation")
    }
    else if(this.registerUserData.dob == null){
      alert("Please enter Date of birth")
    }
    else if(this.registerUserData.phno ==null || this.checkRegno(ph)==false){
      alert("Please enter valid 10 digit phone number")
    }
    else if(this.registerUserData.level === 2 || this.registerUserData.level === 3){
      if(this.registerUserData.passphrase == null || this.registerUserData.passphrase.length <= 10){
        alert("Please provide passphrase with length greater than 10 characters")
      }
    }
    else{
      this.registerUser()
    }
  }
}