import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { HeaderNavComponent } from '../../shared/header-nav/header-nav.component';

interface SignupInput {
  email: String
  firstname: String
  lastname: String
  password: String
}

@Component({
  selector: 'signup',
  standalone: true,
  imports: [HeaderNavComponent, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  user: SignupInput = { firstname: '', lastname: '', email: '', password: ''}

  constructor(private userSvc: UserService) {
  }

  createUser() {
    this.userSvc.create(this.user)
  }
}
