import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../../shared/components/form-error/form-error.component';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../../shared/utils/input-patterns';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  form: FormGroup = new FormGroup({})

  constructor(private userSvc: UserService, private fb: FormBuilder) {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: ['', [
          Validators.required, 
          Validators.minLength(8),
          Validators.pattern(PASSWORD_PATTERN)
        ]
      ]
    })
  }

  createUser() {
    this.userSvc.create(this.form.value)
  }
}
