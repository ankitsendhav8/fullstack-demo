import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public userService = inject(UserService);
  public alertService = inject(AlertService);
  ngOnInit() {
    this.alertService.notifyObservable$.subscribe((data) => {
      if (data.option === 'login') {
        this.userService.isLoggedIn = true;
      }
      if (data.option === 'logout') {
        this.userService.isLoggedIn = false;
      }
    });
  }
}
