import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { ListsComponent } from '../pages/lists/lists.component';

// TODO: Route guards
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'lists/:id',
        component: ListsComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
