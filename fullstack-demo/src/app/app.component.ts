import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public userService = inject(UserService);
  public alertService = inject(AlertService);

  public isLoading = false;
  
  ngOnInit() {
    this.alertService.loading$.subscribe((event) => {
      this.isLoading = event;
    });

  }

}
