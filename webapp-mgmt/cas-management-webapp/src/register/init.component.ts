import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../app/user.service';

@Component({
  selector: 'app-init',
  template: ''
})

export class InitComponent implements OnInit {

  constructor(private router: Router,
              public userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUser().then(resp =>
      this.router.navigate(['services']));
  }
}
