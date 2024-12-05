import { Component, OnInit } from '@angular/core';
import { HeaderNavComponent } from "../../shared/header-nav/header-nav.component";
import { map, Observable, take } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

const GET_LISTS = gql`
  query getWishLists($id: String!) {
    getLists(id: $id) {
      id,
      name,
    }
  }
`

@Component({
  selector: 'lists',
  standalone: true,
  imports: [HeaderNavComponent, AsyncPipe, JsonPipe],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnInit {
  lists$!: Observable<any>

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.lists$ = this.apollo.query({ query: GET_LISTS, variables: {
      id: this.route.snapshot.paramMap.get('id')
    } })
  }
}
