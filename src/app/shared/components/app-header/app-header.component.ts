import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent  implements OnInit {
  @ViewChild('popover') popover: any;
  @Input() title: string = "";
  isOpen: boolean = false;

  userEmail: string = this.authService?.userDetails?.email;
  userDetails = this.authService?.userDetails;
  dammyAvatar:string = "https://ionicframework.com/docs/img/demos/avatar.svg"; 
  
  constructor(private authService: AuthService, private router: Router) { }
  presentPopover(e: any){
    this.popover.event = e;
    this.isOpen = true;
  }

  handlePopoverClose(){
    this.popover.event = null;
    this.isOpen = false;
  }

  handleSignOut(){
    this.handlePopoverClose();
    this.authService.SignOut();
  }
  ngOnInit() {}

}
