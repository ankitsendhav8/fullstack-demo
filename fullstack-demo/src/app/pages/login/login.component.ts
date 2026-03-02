import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public apiService = inject(ApiService);
  private alertService = inject(AlertService);
  private userService = inject(UserService);
  private fb = inject(UntypedFormBuilder);
  public loginForm!: UntypedFormGroup;
  private router = inject(Router);
  
  public showPassword = false;
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onClickLogin() {
    let data = this.loginForm.value;
    this.alertService.displayLoader(true);
    let res = await firstValueFrom(this.apiService.login(data));
    if (res.success) {
      this.alertService.displayLoader(false);
      this.userService.setUserData(res.data);
      this.alertService.notifyOther({ option: 'login', value: true });
      this.router.navigateByUrl('dashboard');
    } else {
      this.alertService.displayLoader(false);
      this.alertService.showMessage('Error', res.message, 'error');
    }
  }
}
