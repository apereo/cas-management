import {Component, OnInit} from '@angular/core';
import {Messages} from '../app/messages';
import {Router} from '@angular/router';
import {UserService} from '../app/user.service';

@Component({
  selector: 'regisgter-root',
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {

  constructor(public messages: Messages,
              public router: Router,
              public userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUser().then(resp =>
      this.router.navigate(['services']));
  }

}


