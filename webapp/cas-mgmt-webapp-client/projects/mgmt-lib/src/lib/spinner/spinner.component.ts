import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';


@Component({
  selector: 'lib-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
  }

  ngOnInit() {
  }

}
