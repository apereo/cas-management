import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../../form-data.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-oauth',
  templateUrl: './oauth.component.html'
})
export class OauthComponent implements OnInit {

  @Input()
  control: FormGroup;


  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
