import {Component, OnDestroy, OnInit} from '@angular/core';
import {DefaultDefinitionForm, SamlDefinitionForm} from './definition.form';
import {DefinitionService} from '../definition.service';
import {DefaultAttributeDefinition, SamlIdPAttributeDefinition} from '@apereo/mgmt-lib/src/lib/model';
import {AppConfigService, ControlsService} from '@apereo/mgmt-lib/src/lib/ui';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

/**
 * Component to display/update an attribute definition.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-definition',
  templateUrl: './definition.component.html'
})
export class DefinitionComponent implements OnInit, OnDestroy {

  form: DefaultDefinitionForm;
  isSaml = false;
  subscription: Subscription;

  constructor(private service: DefinitionService,
              public config: AppConfigService,
              public controls: ControlsService,
              private router: Router,
              private route: ActivatedRoute) {
    this.controls.icon = 'book';
    this.controls.title = 'Attribute Definition';
  }

  /**
   * Starts component by extracting attribute from resolver.
   */
  ngOnInit(): void {
    this.route.data.subscribe( (data: {resp: DefaultAttributeDefinition}) => {
      if (SamlIdPAttributeDefinition.instanceof(data.resp)) {
        this.isSaml = true;
        this.form = new SamlDefinitionForm(data.resp as SamlIdPAttributeDefinition);
      } else {
        this.form = new DefaultDefinitionForm(data.resp);
      }
    });
    this.controls.resetButtons();
    this.subscription = this.controls.save.subscribe(() => this.save());
  }

  /**
   * Destroy subscriptions.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Saves the attribute definition to the server.
   */
  save() {
    this.service.save(this.form.map()).subscribe(
      () => this.router.navigate(['attributes']).then()
    );
  }

  /**
   * Cast definition to SamlDefinitionForm.
   */
  saml(): SamlDefinitionForm {
    return this.form as SamlDefinitionForm;
  }

}
