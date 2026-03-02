import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AlertService } from '../../services/alert.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  public apiService = inject(ApiService);
  private alertService = inject(AlertService);
  private fb = inject(UntypedFormBuilder);
  public signupForm!: UntypedFormGroup;
  private router = inject(Router);

  public showPassword = false;
  public showConfirmPassword = false;

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onClickSignup() {
    let data = this.signupForm.value;
    this.alertService.displayLoader(true);
    let res = await firstValueFrom(this.apiService.signup(data));
    if (res.success) {
      this.alertService.displayLoader(false);
      this.alertService.showMessage('Success', res.message, 'success');
      this.router.navigateByUrl('login');
    } else {
      this.alertService.displayLoader(false);
      this.alertService.showMessage('Error', res.message, 'error');
    }
  }
}
