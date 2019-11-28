import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  register(data) {
    this.user = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    };
    this.userService.registerUser(this.user).subscribe(
      res => {
        this.toastr.success('Usuario creado con éxito')
        this.router.navigate(['']);
      });
  }

}
