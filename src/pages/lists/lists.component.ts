import { Component, OnInit } from '@angular/core';
import { HeaderNavComponent } from "../../shared/header-nav/header-nav.component";
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

const GET_LISTS = gql`
  query getWishLists($id: String!) {
    getLists(userId: $id) {
      id,
      name,
      items {
        id,
        name,
        price,
        purchased,
        url
      } 
    }
  }
`

@Component({
  selector: 'lists',
  standalone: true,
  imports: [HeaderNavComponent, AsyncPipe, JsonPipe, RouterLink],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnInit {
  lists$!: Observable<any>

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.lists$ = this.apollo.query({ query: GET_LISTS, variables: {
      id: this.route.snapshot.paramMap.get('userId')
    } })
  }
}
