import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '@apereo/mgmt-lib';

/**
 * Component to initialize the application.
 */
@Component({
  selector: 'app-init',
  template: ''
})

export class InitComponent implements OnInit {

  constructor(private router: Router,
              public userService: UserService) {
  }

  /**
   * Retrieves user info and then navigates to ServicesComponent.
   */
  ngOnInit() {
    this.userService.getUser().subscribe(resp =>
      this.router.navigate(['services']).then());
  }
}
