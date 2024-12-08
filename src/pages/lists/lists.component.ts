import { Component, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../../shared/components/form-error/form-error.component';
import { EmptyContainerComponent } from '../../shared/components/empty-container/empty-container.component';

const GET_LISTS = gql`
  query getWishLists($id: String!) {
    getLists(userId: $id) {
      id,
      name,
      description,
      author {
        firstname
      },
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

interface AddListRes {
  addList: {
    id: string
  }
}

interface DeleteListRes {
  deleteList: {
    authorId: string
  }
}

const CREATE_LIST = gql`
  mutation createList($data: AddListInput!) {
    addList(data: $data) {
      id
    }
  }
`

const DELETE_LIST = gql`
  mutation deleteList($id: String!) {
    deleteList(id: $id) {
      authorId
    }
  }
`

@Component({
  selector: 'lists',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    ReactiveFormsModule,
    FormErrorComponent,
    EmptyContainerComponent,
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnInit {
  lists$!: Observable<any>
  form: FormGroup = new FormGroup({})

  constructor(
      private apollo: Apollo,
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder) 
  {
    this.form = this.fb.group({
      name: ['', Validators.required],
      eventDate: undefined,
      description: ''
    })
  }

  ngOnInit(): void {
    this.lists$ = this.getLists(this.route.snapshot.paramMap.get('userId') ?? '')
  }

  private getLists(id: string) {
    return this.apollo.query({ 
        query: GET_LISTS, 
        variables: {
          id
        },
        fetchPolicy: 'network-only'
      })
  }

  createList(modalRef: HTMLDialogElement) {
    this.apollo.mutate({ mutation: CREATE_LIST, variables: {
      data: {
        ...this.form.value,
        authorId: this.route.snapshot.paramMap.get('userId')
      }
    }}).pipe(first()).subscribe((res) => {
      const id = (res.data as AddListRes).addList.id
      console.log(id)
      this.router.navigate(['/list', id])
    })

    this.form.reset()
    modalRef.close()
  }

  deleteList(listId: string) {
    this.apollo.mutate({
      mutation: DELETE_LIST,
      variables: {
        id: listId,
      }
    }).subscribe((res) => {
      const id = (res.data as DeleteListRes).deleteList.authorId
      // TODO: Should be a better way to handle this
      this.lists$ = this.getLists(id)
    })
  }
}
