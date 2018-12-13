import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
  }

  ngOnInit() {
  }

}
