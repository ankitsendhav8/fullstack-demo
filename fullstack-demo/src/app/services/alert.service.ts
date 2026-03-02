import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();

  public notify = new Subject<{ option: string; value: any }>();
  notifyObservable$ = this.notify.asObservable();


  notifyOther(data: { option: string; value: any }): void {
    if (data) {
      this.notify.next(data);
    }
  }

  displayLoader(event: boolean) {
    this.loadingSubject.next(event);
  }

  showMessage(title: string, message: string, icon: SweetAlertIcon, time: any = null) {
    Swal.fire({
      title: title,
      html: message,
      icon: icon,
      timer: time
    });
  }
  confirmMessage(title: string, message: string, icon: SweetAlertIcon, time: any = null) {

    return Swal.fire({
      icon: icon,
      title: title,
      html: message,
      showCancelButton: true,
      showConfirmButton: true,
      focusConfirm: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      reverseButtons: false
    });

  }
}
