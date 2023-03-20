import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user-service.service';
import { IData, IUsers } from './models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: IUsers[] = [];
  page = 1;
  size = 25;
  isLoading = false;
  hasMoreData = true;

  @ViewChild('usersList', { static: false }) usersList?: ElementRef;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers(this.page, this.size).subscribe((data: IData) => {
      if (data.list.length === 0) {
        this.hasMoreData = false;
      } else {
        this.users = this.users.concat(data.list as IUsers[]);
        this.hasMoreData = true;
      }
      this.isLoading = false;
    });
  }

  onScrollUsers() {
    const usersListEl = this.usersList?.nativeElement;
    this.userService.onScroll(
      this.page,
      this.hasMoreData,
      this.isLoading,
      usersListEl,
      (page: number) => {
        this.page = page;
        this.getUsers();
      }
    );
  }
}
