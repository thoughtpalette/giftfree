import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

interface SignupInput {
  email: String
  firstname: String
  lastname: String
  password: String
}

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

  login() {}

  logout() {}

  create = async (user: SignupInput) => {
    this.apollo.mutate({ 
      mutation: CREATE_USER, 
      variables: { user }
    }).subscribe(
      ({ data }) => {
        console.log('got data', data);
      },
      error => {
        console.log('there was an error sending the query', error);
      },
    );

  }
}
