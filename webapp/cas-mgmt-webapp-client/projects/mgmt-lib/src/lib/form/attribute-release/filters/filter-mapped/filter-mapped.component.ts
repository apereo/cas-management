import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormDataService} from '../../../../form-data.service';

@Component({
  selector: 'lib-filter-mapped',
  templateUrl: './filter-mapped.component.html',
  styleUrls: ['./filter-mapped.component.css']
})
export class FilterMappedComponent implements OnInit {
  @Input()
  filter: FormGroup;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
