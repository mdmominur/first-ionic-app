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
  constructor(private authService: AuthService, private router: Router) { }
  presentPopover(e: any){
    this.popover.event = e;
    this.isOpen = true;
  }

  handlePopoverClose(){
    this.popover.event = null;
    this.isOpen = false;
  }

  redirectToRecentPosts(){
    this.handlePopoverClose();
    this.router.navigate(['tabs/recent-post']);
  }

  handleSignOut(){
    this.handlePopoverClose();
    this.authService.SignOut();
  }
  ngOnInit() {}

}
