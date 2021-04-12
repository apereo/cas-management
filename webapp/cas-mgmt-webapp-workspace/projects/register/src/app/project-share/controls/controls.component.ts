import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {ControlsService} from './controls.service';

/**
 * Component to display and handle controls for the application.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: [ './controls.component.css' ]
})

export class ControlsComponent {


  constructor(public service: ControlsService, public location: Location) {
  }

  /**
   * Navigates back to previous location in routing.
   */
  goBack() {
    this.location.back();
  }

}

