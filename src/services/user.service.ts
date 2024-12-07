import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { LoginForm } from '../pages/login/login.component';
import { Router } from '@angular/router';

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
  }
}

interface SignupResp {
  signup: {
    user: {
      id: string
    }
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
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo, private router: Router) { }

  login(data: LoginForm) {
    this.apollo.mutate({ 
      mutation: LOGIN_USER, 
      variables: { data }
    }).subscribe((res) => {
      const userId = (res.data as LoginResp)?.login?.user.id
      this.router.navigate([userId])
    })
  }

  logout() {}

  create(user: SignupInput){
    this.apollo.mutate({ 
      mutation: CREATE_USER, 
      variables: { user }
    }).subscribe(res => {
      const userId = (res.data as SignupResp)?.signup?.user.id
      this.router.navigate([userId])
    })
  }
}
