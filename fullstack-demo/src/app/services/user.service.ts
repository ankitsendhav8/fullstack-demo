import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { LocalstorageService } from './localstorage.service';
import { ApiService } from './api.service';
import { APP_CONSTANTS } from '../constants/app.constant';
import { IUser } from '../constants/user';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLoggedIn: boolean = false;
  public isloading: boolean = false;
  public userDetails!: IUser;
  public alertService = inject(AlertService);

  constructor(
    private localstorageService: LocalstorageService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.isUserLoggedIn();
    this.userDetails = JSON.parse(
      this.localstorageService.getDetail(APP_CONSTANTS.USER)
    );
  }
  /* Check user is logged in or not*/
  isUserLoggedIn() {
    this.isLoggedIn = this.localstorageService.getDetail(
      APP_CONSTANTS.AUTH_TOKEN
    )
      ? true
      : false;
    return this.isLoggedIn;
  }
  /* Logout the user, in api side clearing the access key so can't use the token anymore */
  logout() {
    this.apiService.logout(this.userDetails['userId']).subscribe((resp) => {
      if (resp && resp.success) {
        this.alertService.notifyOther({ option: 'logout', value: true });
        this.isLoggedIn = false;
        this.router.navigateByUrl('login');
        this.localstorageService.clearAllDetail();
      }
    });
  }
  /* Getting user details from local storage*/
  getUserDetail() {
    this.userDetails = JSON.parse(
      this.localstorageService.getDetail(APP_CONSTANTS.USER)
    );
    return this.userDetails;
  }
  /* Global method for disble space in input box*/
  disableSpace(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      event.preventDefault();
    }
  }
  setUserData(data: IUser) {
    let { access_token, access_key, ...userData } = data;
    this.userDetails = userData;
    this.isLoggedIn = true;
    this.localstorageService.setDetail(APP_CONSTANTS.USER, JSON.stringify(userData));
    this.localstorageService.setDetail(APP_CONSTANTS.AUTH_TOKEN, access_token);
    this.localstorageService.setDetail(APP_CONSTANTS.ACCESS_KEY, access_key);
  }
}
