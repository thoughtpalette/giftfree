import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { HeaderNavComponent } from "../../shared/header-nav/header-nav.component";
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { FormErrorComponent } from '../../shared/components/form-error/form-error.component';
import { JsonPipe } from '@angular/common';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../../shared/utils/input-patterns';

export interface LoginForm {
  email: string
  password: string
}

@Component({
  selector: 'login',
  standalone: true,
  imports: [HeaderNavComponent, RouterLink, FormErrorComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({})

  constructor(private userSvc: UserService, private fb: FormBuilder){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: ['', [
          Validators.required, 
          Validators.minLength(8),
          Validators.pattern(PASSWORD_PATTERN)
        ]
      ]
    })
  }

  login() {
    this.userSvc.login(this.form.value)
  }
}
