import {Component, OnInit} from '@angular/core';
import {Messages} from '../../app/messages';

@Component({
  selector: 'register-submit',
  templateUrl: './submit.component.html'
})

export class SubmitComponent implements OnInit {

  constructor(public messages: Messages){}

  ngOnInit() {

  }

}