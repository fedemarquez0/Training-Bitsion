import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isCollapsed = false;
  constructor(private clienteService:ClienteService, private userService: UserService, private router: Router) { }

  ngOnInit() { }

  onClickLogout() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

}
