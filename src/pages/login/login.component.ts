import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HeaderNavComponent } from "../../shared/header-nav/header-nav.component";
import { UserService } from '../../services/user.service';

interface User {
  firstName: string
  lastName: string
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
  user: User = { firstName: '', lastName: '', email: '', password: ''}

  constructor(private userSvc: UserService) {
  }

  createUser() {
    this.userSvc.create(this.user)
  }

}
