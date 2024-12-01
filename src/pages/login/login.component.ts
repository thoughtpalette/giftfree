import { Component } from '@angular/core';
import { HeaderNavComponent } from "../../shared/header-nav/header-nav.component";

@Component({
  selector: 'login',
  standalone: true,
  imports: [HeaderNavComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
