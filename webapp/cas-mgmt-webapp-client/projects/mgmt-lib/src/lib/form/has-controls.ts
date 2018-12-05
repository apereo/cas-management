import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Component, Directive} from '@angular/core';

/*
@Component(
  {selector: 'has-controls',
   template: '<div></div>'
  })*/
export abstract class HasControls {

  abstract getControls(): Map<String, AbstractControl>;



}
