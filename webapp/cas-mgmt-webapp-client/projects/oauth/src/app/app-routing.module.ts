import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InitComponent} from '../../../oauth/src/app/core/init.component';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: './form/form.module#FormModule'
  },
  {
    path: 'services',
    loadChildren: './services/services.module#ServicesModule'
  },
  {
    path: '',
    component: InitComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
