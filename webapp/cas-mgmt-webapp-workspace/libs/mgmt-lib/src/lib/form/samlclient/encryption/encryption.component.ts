import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {EncryptionForm} from './encryption.form';

@Component({
  selector: 'lib-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {

  @Input()
  form: EncryptionForm;

  constructor(public formData: FormDataService) { }

  ngOnInit() {
  }

}
