import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormUser } from '../shared/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    isLogin:boolean = true;
    message:string = "";
    
    // Swiper configuration
    swiperConfig = {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000, // Time between transitions in milliseconds (3 seconds in this example)
        disableOnInteraction: false // Stop autoplay on user interaction (false to continue autoplay)
      }
    };

    
    constructor(private authService: AuthService) {
    }
    googleLogin(){
      this.authService.GoogleAuth().then(res => {
        this.authService.authCheck();
        if(this.authService.isEmailVerified){
          this.flashMessage("Logged in success");
        }else{
          this.authService.SendVerificationMail();
          this.flashMessage("We have sent your a mail confirmation message please verify your email address and login.");
        }
      })
      //  this.authService.SignIn("momenserdar@gmail.com", "mominur Rahman");
      
    }

    toggleRegister(){
      this.isLogin = !this.isLogin;
    }

    onSubmitRegister(userDetails: FormUser){    
    this.authService.RegisterUser(userDetails?.email, userDetails?.password).then(res => {
      this.authService.SendVerificationMail().then(res => {
        this.flashMessage("We have sent your a mail confirmation message please verify your email address and login.");
        this.toggleRegister();
      }).catch(error => {
        this.flashMessage("INVALID LOGIN CREDENTIALS");
      })
    })
    }


    handleLogin(userDetails: FormUser){
      this.authService.SignIn(userDetails?.email, userDetails.password).then(data => {
        this.authService.authCheck();
        if(this.authService.isEmailVerified ||  data?.user?.emailVerified){
          return;
        }else{
          this.authService.SendVerificationMail();
          this.flashMessage("We have sent your a mail confirmation message please verify your email address and login.");
        }
      }).catch(error => {
          this.flashMessage("INVALID LOGIN CREDENTIALS");
        
      })
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
