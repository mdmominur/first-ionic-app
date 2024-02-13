import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  constructor(private authService: AuthService) { }
  presentPopover(e: any){
    this.popover.event = e;
    this.isOpen = true;
  }

  handleSignOut(){
    this.popover.event = null;
    this.isOpen = false;
    this.authService.SignOut();
  }
  ngOnInit() {}

}
