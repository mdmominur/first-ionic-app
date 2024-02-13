import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  @Output() toggleRegister = new EventEmitter();
  @Output() handleLogin = new EventEmitter();
  constructor() { }

  handleRegister(){
    this.toggleRegister.emit();
  }

  onLogin(email: any, password: any){
    this.handleLogin.emit({email, password});
  }

  ngOnInit() {}

}
