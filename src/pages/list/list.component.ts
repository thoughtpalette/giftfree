import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { HeaderNavComponent } from '../../shared/header-nav/header-nav.component';

const GET_LIST = gql`
  query getList($listId: String!) {
    getList(listId: $listId) {
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
  selector: 'list',
  standalone: true,
  imports: [HeaderNavComponent, AsyncPipe, JsonPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  list$!: Observable<any>

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('listId'))
    this.list$ = this.apollo.query({ query: GET_LIST, variables: {
      listId: this.route.snapshot.paramMap.get('listId')
    } })
  }
}
