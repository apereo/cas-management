import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {AppConfigService, ControlsService, PaginatorComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {DomainRpc} from '@apereo/mgmt-lib/src/lib/model';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';

/**
 * Component that displays a list of all registered domains in the registry.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit, OnDestroy {
  displayedColumns = ['actions', 'name'];
  dataSource: MatTableDataSource<DomainRpc>;
  selectedItem: DomainRpc;
  subscription: Subscription;

  @ViewChild(PaginatorComponent, { static: true }) paginator: PaginatorComponent;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public app: AppConfigService,
              public controls: ControlsService) {
    this.controls.icon = 'language';
    this.controls.title = 'Domains';
  }


  /**
   * Starts the component by retrieving the list of domains from the resolver.
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: {resp: DomainRpc[]}) => {
          this.dataSource = new MatTableDataSource(data.resp);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator.paginator;
        },
        () => this.app.showSnackBar('Failed to load domains')
      );
    this.controls.resetButtons();
    this.controls.showNew = true;
    this.subscription = this.controls.newService.subscribe(() => this.createService());
  }

  /**
   * Destroy subscriptions.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Receives entered text form the screen filter to apply to the list.
   *
   * @param val - partial string to filter by
   */
  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

  /**
   * Navigates the router to the ServicesComponent for the passed domain.
   *
   * @param domain - domain to view
   */
  view(domain: string) {
    this.router.navigate(['registry/services', domain]).then();
  }

  /**
   * Navigates to FormComponent to create a new RegexRegistered Service.
   */
  createService() {
    this.router.navigate(['form/edit/-1']).then();
  }
}
