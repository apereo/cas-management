import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {UserinfoForm} from './userinfo.form';

@Component({
  selector: 'lib-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  @Input()
  form: UserinfoForm;

  constructor(public formData: FormDataService) { }

  ngOnInit() {
  }

}
