import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from 'shared-lib';

@Component({
  selector: 'app-init',
  template: ''
})

export class InitComponent implements OnInit {

  constructor(private router: Router,
              public userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(resp =>
      this.router.navigate(['dashboard']));
  }
}
