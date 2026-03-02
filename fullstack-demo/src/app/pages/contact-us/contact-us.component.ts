import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AlertService } from '../../services/alert.service';
@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  public apiService = inject(ApiService);
  private alertService = inject(AlertService);

  public firstName = '';
  public lastName = '';
  public email = '';
  public description = '';
  public emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  public isEmailValid = false;
  async contactUsDetails() {
    this.isEmailValid = this.emailRegex.test(this.email);
    if(!this.isEmailValid) {
      this.alertService.showMessage('Error', 'Please enter a valid email address', 'error');
      return;
    }
    let data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      description: this.description,
    }
    this.alertService.displayLoader(true);
    let res = await firstValueFrom(this.apiService.contactUsDetails(data));
    if (res.success) {
      this.alertService.displayLoader(false);
      this.alertService.showMessage('Thank you for contacting us', 'Contact details submitted successfully.<br/>We will get back to you soon!', 'success', 3000);
      this.resetData();
    } else {
      this.alertService.displayLoader(false);
      this.alertService.showMessage('Error', res.message, 'error');
      this.resetData();
    }
  }
  resetData() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.description = '';
  }
}
