import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DefaultAttributeDefinition} from '@apereo/mgmt-lib/src/lib/model';
import {ControlsService, PaginatorComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {DefinitionService} from '../definition.service';
import {Subscription} from 'rxjs';

/**
 * Component that displays the list of AttributeDefinitions from the AttributeDefintionStore.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-definition-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  definitions: DefaultAttributeDefinition[];
  displayedColumns = ['actions', 'name'];
  dataSource: MatTableDataSource<DefaultAttributeDefinition>;
  selectedItem: DefaultAttributeDefinition;
  subscription: Subscription;

  @ViewChild(PaginatorComponent, {static: true}) paginator: PaginatorComponent;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: DefinitionService,
              public controls: ControlsService,
              private router: Router,
              private route: ActivatedRoute) {
    this.controls.title = 'Attribute Store';
    this.controls.icon = 'book';
  }

  /**
   * Starts the component by getting the attribute definitions.
   */
  ngOnInit(): void {
    this.route.data.subscribe((data: { resp: DefaultAttributeDefinition[] }) => {
      this.definitions = data.resp;
      this.dataSource = new MatTableDataSource<DefaultAttributeDefinition>(this.definitions);
      this.dataSource.paginator = this.paginator.paginator;
    });
    this.controls.resetButtons();
    this.controls.showNew = true;
    this.subscription = this.controls.newService.subscribe(() => this.createAttribute());
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
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = val;
  }

  /**
   * .
   */
  createAttribute() {
    this.router.navigate(['new'], { relativeTo: this.route} ).then();
  }

  /**
   * Navigates to the definition edit view.
   *
   * @param item - Item to nav to.
   */
  view(item: DefaultAttributeDefinition) {
    this.router.navigate([(item ? item.key : this.selectedItem.key)], { relativeTo: this.route}).then();
  }

  /**
   * Deletes attribute definition from the definition store.
   */
  delete(item: DefaultAttributeDefinition) {
    this.service.deleteAttribute(item.key).subscribe(() => {
      this.definitions.splice(this.definitions.indexOf(item), 1);
      this.dataSource.data = this.definitions;
    });
  }
}
