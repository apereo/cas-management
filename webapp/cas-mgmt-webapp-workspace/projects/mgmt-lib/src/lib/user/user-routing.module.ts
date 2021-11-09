import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentUserComponent } from './current-user/current-user.component';

const routes: Routes = [
    {
        path: 'current-user',
        component: CurrentUserComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'current-user'
    },
    {
        path: '**',
        redirectTo: 'current-user'
    }
];

/**
 * Routing module for version control components.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
