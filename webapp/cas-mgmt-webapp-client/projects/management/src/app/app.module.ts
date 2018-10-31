import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ServicesModule} from './services/services.module';
import {FormModule} from './form/form.module';
import { DeleteComponent } from './delete/delete.component';
import {DomainsModule} from './domains/domains.module';
import { SearchComponent } from './search/search.component';
import {SearchService} from './search/SearchService';

import {HistoryModule} from './history/history.module';
import {RevertComponent} from './revert/revert.component';
import {ChangesModule} from './changes/changes.module';
import {DiffModule} from './diff/diff.module';
import {JSONModule} from './json/json.module';
import {HttpClientModule} from '@angular/common/http';
import { LocalChangesComponent } from './local-changes/local-changes.component';
import { YamlComponent } from './yaml/yaml.component';
import {YamlResolver} from './yaml/yaml.resolover';
import {PullModule} from './pull/pull.module';
import {SubmitModule} from './submits/submits.module';
import {NotesModule} from './notes/notes.module';
import {RejectComponent} from './reject/reject.component';
import {AcceptComponent} from './accept/accept.component';
import { ImportComponent } from './import/import.component';
import {ImportService} from './import/import.service';
import { RepoHistoryComponent } from './repo-history/repo-history.component';
import {RepoHistoryService} from './repo-history/repo-history.service';
import {CommitHistoryModule} from './commit-history/commit-history.module';
import {LocalChangesResolver} from './local-changes/local-changes.resolver';
import {RepoHistoryResolver} from './repo-history/repo-history.resolver';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import {DiffViewComponent} from './diff-view/diff-view.component';
import {MgmtLibModule, SharedModule} from 'mgmt-lib';
import {TimeoutComponent} from './timeout/timeout.component';
import {InitComponent} from './init.component';
import {CommitComponent} from './commit/commit.component';
import {PublishComponent} from './publish/publish.component';
import {MatIconModule} from '@angular/material';
import {MgmtModule} from './mgmt.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MgmtLibModule,
    DomainsModule,
    ServicesModule,
    HistoryModule,
    JSONModule,
    ChangesModule,
    DiffModule,
    PullModule,
    SubmitModule,
    NotesModule,
    FormModule,
    AppRoutingModule,
    CommitHistoryModule,
    LayoutModule,
    SharedModule,
    MatIconModule,
    ServicesModule,
    MgmtModule,
  ],
  declarations: [
    AppComponent,
    DeleteComponent,
    SearchComponent,
    RevertComponent,
    AcceptComponent,
    RejectComponent,
    LocalChangesComponent,
    YamlComponent,
    ImportComponent,
    RepoHistoryComponent,
    NavigationComponent,
    DiffViewComponent,
    TimeoutComponent,
    InitComponent,
    CommitComponent,
    PublishComponent,
  ],
  entryComponents: [
    DeleteComponent,
    RevertComponent,
    AcceptComponent,
    RejectComponent,
    DiffViewComponent
  ],
  providers: [
    SearchService,
    YamlResolver,
    ImportService,
    RepoHistoryService,
    LocalChangesResolver,
    RepoHistoryResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
