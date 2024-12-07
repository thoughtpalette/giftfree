import { Component, OnInit } from '@angular/core';
import { HeaderNavComponent } from "../../shared/header-nav/header-nav.component";
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../../shared/components/form-error/form-error.component';
import { EmptyContainerComponent } from '../../shared/components/empty-container/empty-container.component';

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

interface AddListRes {
  addList: {
    authorId: string
  }
}

const CREATE_LIST = gql`
  mutation createList($data: AddListInput!) {
    addList(data: $data) {
      authorId
    }
  }
`

@Component({
  selector: 'lists',
  standalone: true,
  imports: [
    HeaderNavComponent,
    AsyncPipe,
    RouterLink,
    ReactiveFormsModule,
    FormErrorComponent,
    EmptyContainerComponent
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
      private fb: FormBuilder) 
  {
    this.form = this.fb.group({
      name: ['', Validators.required],
      eventDate: undefined,
      description: ''
    })
  }

  ngOnInit(): void {
    this.lists$ = this.getLists()
  }

  private getLists() {
    return this.apollo.query({ query: GET_LISTS, variables: {
      id: this.route.snapshot.paramMap.get('userId')
    }})
  }

  createList(modalRef: HTMLDialogElement) {
    this.apollo.mutate({ mutation: CREATE_LIST, variables: {
      data: {
        ...this.form.value,
        authorId: this.route.snapshot.paramMap.get('userId')
      }
    }}).subscribe((res) => {
      const id = (res.data as AddListRes).addList.authorId

      // TODO: Should be a better way to handle this
      this.lists$ = this.apollo.query({ 
        query: GET_LISTS, 
        variables: {
          id: id
        },
        fetchPolicy: 'network-only',
      })
    })

    this.form.reset()
    modalRef.close()
  }
}
