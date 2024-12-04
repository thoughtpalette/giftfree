import { Component, OnInit } from '@angular/core';
import { HeaderNavComponent } from "../../shared/header-nav/header-nav.component";
import { map, Observable, take } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

const GET_LISTS = gql`
  query getWishLists {
    lists
  }
`

@Component({
  selector: 'lists',
  standalone: true,
  imports: [HeaderNavComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnInit {
  lists$!: Observable<any>

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.lists$ = this.apollo.query({ query: GET_LISTS}).pipe(map((result => {
      console.log(result)
      return result.data
  })))
  }
}
