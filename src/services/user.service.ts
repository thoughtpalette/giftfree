import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

interface User {
  firstName: string
  lastName: string
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  login() {}

  logout() {}

  create(user: User) {

    const createUser = gql`
    mutation AuthUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
      signup(
        firstname: $firstName,
        lastname: $lastName,
        email: $email,
        password: $password
      ) {
        id
        firstname
        lastname
        email
        password
      }
    }`


    this.apollo.mutate({ 
      mutation: createUser, 
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
    }});
  }
}
