import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'header-nav',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss'
})
export class HeaderNavComponent {
  isLoggedIn$!: Observable<any>
  userId?: string

  constructor(private userSvc: UserService){}

  ngOnInit() {
    this.isLoggedIn$ = this.userSvc.isLoggedIn$
    this.userId = this.userSvc.userId
  }

  logout() {
    this.userSvc.logout()
  }
}
