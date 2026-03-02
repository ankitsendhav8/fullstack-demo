import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from '../../constants/user';
@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {
  @ViewChild('viewUserDetailsModal') viewUserDetailsModal!: ElementRef;
  public apiService = inject(ApiService);
  private alertService = inject(AlertService);
  public modalService = inject(NgbModal);
  public selectedUser!: IUser;
  public usersList: any[] = [];
  public modalRef!: NgbModalRef;
  public modalOptions: NgbModalOptions = {
    centered: true,
    size: 'md',
    backdrop: 'static',
    keyboard: false,
    scrollable: true
  };
  ngOnInit() {
    this.fetchTeamList();
  }
  async fetchTeamList() {
    let res = await firstValueFrom(this.apiService.getAllUserList({}));
    if (res.success) {
      this.alertService.displayLoader(false);
      this.usersList = res.data;
    } else {
      this.alertService.displayLoader(false);
      this.alertService.showMessage('Error', res.message, 'error');

    }
  }
  async updateUserStatus(user: IUser) {

    user.status = user.status === 'Active' ? 'Inactive' : 'Active';
    this.alertService.confirmMessage('Alert', `Are you sure you want to update the user status to ${user.status}?`, 'warning').then(async (result) => {
      if (result.value) {
        this.alertService.displayLoader(true);
        let res: any = await firstValueFrom(this.apiService.updateUserDetail(user));
        if (res.success) {
          this.alertService.displayLoader(false);
          this.alertService.showMessage('Success', res.message, 'success');
          this.fetchTeamList();
        } else {
          this.alertService.displayLoader(false);
          this.alertService.showMessage('Error', res.message, 'error');
        }
      }
    });

  }
  viewUserDetails(user:any) {
    this.selectedUser = user;
    this.modalRef = this.modalService.open(this.viewUserDetailsModal, this.modalOptions);
  }
}
