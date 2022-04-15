import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
export class User {
  public username: any;
  public passcode: any;
  public passphrase : any;
  public level : any;
  public phno : any;
}
export class VerifyOTPclass {
  public phno : any;
  public code : any;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = new User();
  OTP = new VerifyOTPclass();
  yes:any;
  yess:any;

  otp : any;
  loader = false;
  isVerified = false;
  constructor(private service:AppService,public router:Router) { }
  loginUser () {
    this.loader = true;
    // this.spinner.show();
    setTimeout(()=>{
      this.service.login(this.loginUserData)
      .subscribe(
        (res:any) => {
          window.localStorage.setItem('token', res.token)
          window.localStorage.setItem('un', JSON.stringify(res.user.username))
          window.localStorage.setItem('id', JSON.stringify(res.user._id))
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
              this.loader = false;
              alert(err.error);
              // this.spinner.hide();
            }
          }
          if(err instanceof HttpErrorResponse) {
            if(err.status === 401){
              this.loader = false;
              alert(err.error);
              // this.spinner.hide();
            }
          }
        }
      ) 
    },1000)
  }
  funSendOTP(){
    var ph = (this.loginUserData.phno).toString();
    console.log(ph);
    this.service.sendotpservice(this.loginUserData).subscribe((res:any)=>{
      alert("OTP send successfully ! Please check your phone")
      console.log(res);
    })
  }
  funVerifyOTP(){
    this.OTP.phno = this.loginUserData.phno;
    console.log(this.OTP)
    this.service.verifyotpservice(this.OTP).subscribe((res:any)=>{
      if(res == "approved"){
          this.isVerified = true;
          alert("Phone Number verified !")
      }
      else{
        alert("Wrong OTP. Enter Again")
      }
    })
  }
  check(){
    console.log(this.loginUserData)
    if(this.loginUserData.username==null){
      alert("Username is Empty")
    }else if(this.loginUserData.passcode==null){
      alert("Passcode is Empty")
    }
    else{
      this.loginUser()
    }
  }
  ngOnInit() {
    
    // this.loginUserData.passphrase = "demo";
  }
}
