import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail: string = this.authService?.userDetails?.email;
  userDetails = this.authService?.userDetails;
  dammyAvatar:string = "https://ionicframework.com/docs/img/demos/avatar.svg"; 
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

}
