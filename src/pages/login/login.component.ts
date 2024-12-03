import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HeaderNavComponent } from "../../shared/header-nav/header-nav.component";
import { UserService } from '../../services/user.service';

interface SignupInput {
  email: String
  firstname: String
  lastname: String
  password: String
}

@Component({
  selector: 'login',
  standalone: true,
  imports: [HeaderNavComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: SignupInput = { firstname: '', lastname: '', email: '', password: ''}

  constructor(private userSvc: UserService) {
  }

  createUser() {
    this.userSvc.create(this.user)
  }

}
