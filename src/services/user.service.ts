import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { LoginForm } from '../pages/login/login.component';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface SignupInput {
  email: String
  firstname: String
  lastname: String
  password: String
}

interface LoginResp {
  login: {
    user: {
      id: string
    }
    accessToken: string
  }
}

interface SignupResp {
  signup: {
    user: {
      id: string
    }
    accessToken: string
  }
}

const LOGIN_USER = gql`
  mutation Mutation($data: LoginInput!) {
    login(data: $data) {
      user {
        id,
        email,
      },
      accessToken
    }
  }
`

const CREATE_USER = gql`
  mutation Mutation($user: SignupInput!) {
    signup(data: $user) {
      user {
        email,
        id,
      }
      accessToken
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _isLoggedIn = new BehaviorSubject(false)
  isLoggedIn$ = this._isLoggedIn.asObservable()
  _userId?: string

  setUserId(id: string) {
    this._userId = id
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this._isLoggedIn.next(isLoggedIn)
  }

  get isLoggedIn() {
    return this._isLoggedIn.getValue()
  }

  get userId() {
    return this._userId
  }

  constructor(private apollo: Apollo, private router: Router) { 
    const userId = window.localStorage.getItem('USER_ID');
    // TODO: Handle this better
    if (window.localStorage.getItem('TOKEN') && userId) {
      this.setIsLoggedIn(true)
      this.setUserId(userId)
    }
  }

  login(data: LoginForm) {
    this.apollo.mutate({ 
      mutation: LOGIN_USER, 
      variables: { data }
    }).subscribe((res) => {
      const userId = (res.data as LoginResp)?.login?.user.id
      const token = (res.data as LoginResp)?.login?.accessToken

      window.localStorage.setItem('USER_ID', userId)
      window.localStorage.setItem('TOKEN', token)

      this.setIsLoggedIn(true)
      this.router.navigate([userId])
    })
  }

  logout() {
    this.setIsLoggedIn(false)
    window.localStorage.removeItem('TOKEN')
    window.localStorage.removeItem('USER_ID')
    this.router.navigate(['/'])
  }

  create(user: SignupInput){
    this.apollo.mutate({ 
      mutation: CREATE_USER, 
      variables: { user }
    }).subscribe(res => {
      const userId = (res.data as SignupResp)?.signup?.user.id
      const token = (res.data as SignupResp)?.signup?.accessToken

      window.localStorage.setItem('TOKEN', token)
      window.localStorage.setItem('USER_ID', userId)      

      this.setIsLoggedIn(true)
      this.router.navigate([userId])
    })
  }
}
