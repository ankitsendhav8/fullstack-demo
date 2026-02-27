import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}
  /* localstorage methods for store, remove, clear and get detail from local storage */
  setDetail(key: string, value: any): any {
    return localStorage.setItem(key, value);
  }
  getDetail(key: string): any {
    return localStorage.getItem(key);
  }
  removeDetail(key: string): any {
    return localStorage.removeItem(key);
  }
  clearAllDetail(): any {
    localStorage.clear();
  }
}
