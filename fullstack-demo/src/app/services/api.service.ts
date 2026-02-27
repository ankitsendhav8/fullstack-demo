import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../constants/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  login(user: IUser): Observable<any> {
    return this.http.post(`auth/login`, user);
  }
  logout(userId: number): Observable<any> {
    return this.http.post(`auth/logout`, { id: userId });
  }
  signup(user: IUser): Observable<any> {
    return this.http.post(`auth/signup`, user);
  }
  getUserDetail(userId: number): Observable<any> {
    return this.http.get(`user/${userId}`);
  }
  getAllUserList(data: any): Observable<any> {
    return this.http.post(`user/list`, data);
  }
  updateUserDetail(userId: number, data: any): Observable<any> {
    return this.http.put(`user/${userId}`, data);
  }
  contactUsDetails(data: any): Observable<any> {
    return this.http.put(`user/`, data);
  }
}
