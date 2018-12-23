import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../../form-data.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-mapped',
  templateUrl: './mapped.component.html'
})
export class MappedComponent implements OnInit {

  @Input()
  control: FormGroup;


  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
