import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HeaderNavComponent } from "../../shared/header-nav/header-nav.component";
import { UserService } from '../../services/user.service';

export interface LoginForm {
  email: string
  password: string
}

@Component({
  selector: 'login',
  standalone: true,
  imports: [HeaderNavComponent, FormsModule],
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
