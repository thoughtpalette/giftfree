import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { EmptyContainerComponent } from '../../shared/components/empty-container/empty-container.component';

interface AddItemForm {
  name: string
  url: string
  price?: number
  notes?: string
}

interface AddItemResp {
  addItem: {
    listId: string
  }
}

interface DeleteItemRes {
  deleteItem: {
    id: string
  }
}

const initialForm: AddItemForm = {
  name: '',
  url: '',
  price: undefined,
  notes: undefined,
}

const GET_LIST = gql`
  query getList($listId: String!) {
    getList(listId: $listId) {
      id,
      name,
      author {
        id,
        firstname
      },
      items {
        id,
        name,
        notes,
        price,
        purchased,
        url
      } 
    }
  }
`

const ADD_ITEM = gql`
  mutation addItem($addItemInput: AddItemInput!) {
    addItem(data: $addItemInput) {
      listId
    }
  }
`

const REMOVE_ITEM = gql`
  mutation deleteItem($id: String!, $listId: String!) {
    deleteItem(id: $id, listId: $listId){
      id,
      name,
      author {
        id,
        firstname
      },
      items {
        id,
        name,
        notes,
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
  imports: [
    AsyncPipe,
    CurrencyPipe,
    FormsModule,
    RouterLink,
    EmptyContainerComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  list$!: Observable<any>
  form = { ...initialForm}

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.list$ = this.getList(this.route.snapshot.paramMap.get('listId') ?? '')
  }

  private getList(id: string) {
    return this.apollo.query({ 
        query: GET_LIST, 
        variables: {
          listId: id
        },
        fetchPolicy: 'network-only',
      })
  }

  addItem(modalRef: HTMLDialogElement) {
    this.apollo.mutate({ mutation: ADD_ITEM, variables: {
      addItemInput: {
        ...this.form,
        price: Number(this.form.price),
        purchased: false,
        listId: this.route.snapshot.paramMap.get('listId')
      }
    }}).subscribe((res) => {
      const listId = (res.data as AddItemResp).addItem.listId
      // TODO: Should be a better way to handle this
      this.list$ = this.getList(listId)
    })

    this.form = { ...initialForm }
    modalRef.close()
  }

  deleteItem(id: string) {
    this.apollo.mutate({
      mutation: REMOVE_ITEM,
      variables: {
        id,
        listId: this.route.snapshot.paramMap.get('listId')
      }
    }).subscribe((res) => {
      const id = (res.data as DeleteItemRes).deleteItem.id
      // TODO: Should be a better way to handle this
      this.list$ = this.getList(id)
    })
  }
}
