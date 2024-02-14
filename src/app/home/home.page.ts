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
    slideImages = [
      'https://png.pngtree.com/png-vector/20220921/ourmid/pngtree-welcome-text-effect-with-colorful-heart-shaped-png-image_6208004.png',
      'https://img.freepik.com/free-vector/hand-drawn-collage-background_23-2149590537.jpg?t=st=1707852423~exp=1707853023~hmac=2ec056a7810bd358cf75a722a7da28c6c781a39a22dbae34d1948c6e90a307c2',
      'https://img.freepik.com/free-vector/hand-drawn-collage-design_23-2149543516.jpg?t=st=1707852423~exp=1707853023~hmac=baca39744ebe04390b0096a9398a2637d4c9d8a3b380298fbffdb80a357a1239&w=826'
  ];
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
    }

    toggleRegister(){
      this.isLogin = !this.isLogin;
    }

    onSubmitRegister(userDetails: FormUser){    
      if(userDetails?.email?.trim() === "" || userDetails?.password?.trim() === ""){
        alert("Credentials should not be empty")
      }else{
        this.authService.RegisterUser(userDetails?.email, userDetails?.password).then(res => {
          this.authService.SendVerificationMail().then(res => {
            this.flashMessage("We have sent your a mail confirmation message please verify your email address and login.");
            this.toggleRegister();
          }).catch(error => {
            this.flashMessage("INVALID LOGIN CREDENTIALS");
          })
        })
      }
    }


    handleLogin(userDetails: FormUser){
      if(userDetails?.email?.trim() === "" || userDetails?.password?.trim() === ""){
        alert("Credentials should not be empty")
      }else{
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
