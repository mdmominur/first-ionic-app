import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  @Output() toggleRegister = new EventEmitter();
  @Output() onSubmitRegister = new EventEmitter();

  constructor() { }
  handleLoginClick(){
    this.toggleRegister.emit();
  }

  handleOnSubmitForm(email: any, password: any){
    this.onSubmitRegister.emit({email: email.value, password: password.value});
  }

  ngOnInit() {}

}
