import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    isLogin:boolean = true;
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

    
    constructor(private authService: AuthService) { }
    googleLogin(){
      this.authService.GoogleAuth()
      //  this.authService.SignIn("momenserdar@gmail.com", "mominur Rahman");
      
    }

    toggleRegister(){
      this.isLogin = !this.isLogin;
    }

  ngOnInit() {
  }

}
