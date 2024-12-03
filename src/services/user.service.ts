import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { LoginForm } from '../pages/login/login.component';

interface SignupInput {
  email: String
  firstname: String
  lastname: String
  password: String
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

  constructor(private apollo: Apollo) { }

  login(data: LoginForm) {
    this.apollo.mutate({ 
      mutation: LOGIN_USER, 
      variables: { data }
    }).subscribe(res => console.log(res))
  }

  logout() {}

  create(user: SignupInput){
    this.apollo.mutate({ 
      mutation: CREATE_USER, 
      variables: { user }
    }).subscribe(res => console.log(res))
  }
}
