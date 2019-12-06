import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {SigningFrom} from './signing.from';

@Component({
  selector: 'lib-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css']
})
export class SigningComponent implements OnInit {

  @Input()
  form: SigningFrom;

  constructor(public formData: FormDataService) { }

  ngOnInit() {
  }

}
