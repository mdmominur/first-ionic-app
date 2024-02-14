import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail: string = this.authService?.userDetails?.email;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

}
