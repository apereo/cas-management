/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import {ServicesComponent} from './services/services.component';
import {ServicesResolve} from './services/services.resolover';
import {DomainsComponent} from './domains/domains.component';
import {SearchComponent} from './search/search.component';
import {InitComponent} from './init.component';
import {HistoryComponent} from './history/history.component';
import {HistoryResolve} from './history/history.resolover';
import {DiffComponent} from './diff/diff.component';
import {JSONComponent} from './json/json.component';
import {JSONResolver} from './json/json.resolover';
import {LocalChangesComponent} from './local-changes/local-changes.component';
import {YamlComponent} from './yaml/yaml.component';
import {YamlResolver} from './yaml/yaml.resolover';
import {PullComponent} from './pull/pull.component';
import {SubmitsComponent} from './submits/submits.component';
import {ChangesComponent} from './changes/changes.component';
import {ChangesResolve} from './changes/changes.resolover';
import {NotesComponent} from './notes/notes.component';

@NgModule({
  imports: [
    RouterModule.forRoot( [
      {
        path: 'domains',
        component: DomainsComponent,
      },
      {
        path: 'services/:domain',
        component: ServicesComponent,
        resolve: {
          resp: ServicesResolve
        }
      },
      {
        path: 'search/:query',
        component: SearchComponent
      },
      {
        path: 'history/:fileName',
        component: HistoryComponent,
        resolve: {
            resp: HistoryResolve
        }
      },
      {
        path: 'diff',
        component: DiffComponent
      },
      {
        path: 'json/:id',
        component: JSONComponent,
        resolve: {
          resp: JSONResolver
        }
      },
      {
        path: 'viewJson/:id',
        component: JSONComponent,
        resolve: {
          resp: JSONResolver
        },
        data: {
          history: true
        }
      },
      {
        path: 'yaml/:id',
        component: YamlComponent,
        resolve: {
          resp: YamlResolver
        }
      },
      {
        path: 'viewYaml/:id',
        component: YamlComponent,
        resolve: {
          resp: YamlResolver
        },
        data: {
          history: true
        }
      },
      {
        path: 'localChanges',
        component: LocalChangesComponent
      },
      {
        path: 'manage.html',
        component: InitComponent
      },
      {
        path: 'pulls',
        component: PullComponent
      },
      {
        path: 'submits',
        component: SubmitsComponent
      },
      {
        path: 'changes/:branch',
        component: ChangesComponent,
        resolve: {
          resp: ChangesResolve
        }
      },
      {
        path: 'notes/:id',
        component: NotesComponent
      }
    ]),
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
