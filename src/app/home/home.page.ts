import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormUser } from '../shared/user';
import { updateProfile  } from '@angular/fire/auth';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    isLogin:boolean = true;
    message:string = "";
    constructor(private authService: AuthService, private generalService: GeneralService) {
    }

    toggleRegister(){
      this.isLogin = !this.isLogin;
    }

    onSubmitRegister(userDetails: FormUser){    
      if(userDetails?.email?.trim() === "" || userDetails?.password?.trim() === "" || userDetails?.fullName?.trim() === ""){
        alert("Credentials should not be empty");
      }else{
        this.generalService.setGlobalLoading(true);
        this.authService.RegisterUser(userDetails?.email, userDetails?.password).then((res:any) => {
          updateProfile(res?.user, {
            displayName: userDetails?.fullName?.trim()
          });
          this.authService.SendVerificationMail().then(response => {
            this.flashMessage("We have sent your a mail confirmation message please verify your email address and login.");
            this.toggleRegister();
            this.generalService.setGlobalLoading(false);
          }).catch(error => {
            console.log("error ===>", error);
            this.flashMessage("INVALID LOGIN CREDENTIALS");
            this.generalService.setGlobalLoading(false);
          })
        })
      }
    }


    handleLogin(userDetails: FormUser){
      if(userDetails?.email?.trim() === "" || userDetails?.password?.trim() === ""){
        alert("Credentials should not be empty")
      }else{
        this.generalService.setGlobalLoading(true);
        this.authService.SignIn(userDetails?.email, userDetails.password).then(data => {
          this.authService.authCheck();
          this.generalService.setGlobalLoading(false);
          if(this.authService.isEmailVerified ||  data?.user?.emailVerified){
            return;
          }else{
            this.authService.SendVerificationMail();
            this.flashMessage("We have sent your a mail confirmation message please verify your email address and login.");
          }
        }).catch(error => {
          this.generalService.setGlobalLoading(false);
            this.flashMessage("INVALID LOGIN CREDENTIALS");
          
        })
      }
    }

    flashMessage(msg: string){
      this.message = msg;
      setTimeout(()=>{
        this.message = "";
      }, 5000);
    }

  ngOnInit() {
  }

}
