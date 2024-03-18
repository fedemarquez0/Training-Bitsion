import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formReg: FormGroup;
  loading$ = this.userService.loading$;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  signup() {
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        this.userService.logout();
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

}
