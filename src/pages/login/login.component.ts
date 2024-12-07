import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HeaderNavComponent } from "../../shared/header-nav/header-nav.component";
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

export interface LoginForm {
  email: string
  password: string
}

@Component({
  selector: 'login',
  standalone: true,
  imports: [HeaderNavComponent, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: LoginForm = { email: '', password: '' }

  constructor(private userSvc: UserService){}

  login() {
    this.userSvc.login(this.form)
  }
}
