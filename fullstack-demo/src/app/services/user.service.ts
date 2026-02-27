import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { LocalstorageService } from './localstorage.service';
import { ApiService } from './api.service';
import { APP_CONSTANTS } from '../constants/app.constant';
import { IUser } from '../constants/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLoggedIn: boolean = false;
  public isloading: boolean = false;
  public userDetails!: IUser;
  notify = new Subject<{ option: string; value: any }>();
  notifyObservable$ = this.notify.asObservable();

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
  notifyOther(data: { option: string; value: any }): void {
    if (data) {
      this.notify.next(data);
    }
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
    this.apiService.logout(this.userDetails['id']).subscribe((resp) => {
      if (resp && resp.success) {
        this.notifyOther({ option: 'logout', value: true });
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
}
