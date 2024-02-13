import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  @Output() toggleRegister = new EventEmitter();
  constructor() { }
  handleLoginClick(){
    this.toggleRegister.emit();
  }
  ngOnInit() {}

}
