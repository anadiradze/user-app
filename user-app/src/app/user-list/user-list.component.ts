import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  page = 1;
  size = 30;
  isLoading = false;
  hasMoreData = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('this.getUsers()', this.getUsers());
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers(this.page, this.size).subscribe((data: any) => {
      console.log('data', data);
      if (data.length === 0) {
        this.hasMoreData = false;
      } else {
        this.users = this.users.concat(data.list);
        this.hasMoreData = true;
      }
      this.isLoading = false;
    });
  }

  onScroll() {
    console.log('onScroll() called');
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.body.offsetHeight;
    const buffer = 100;
    if (scrollPosition >= documentHeight - buffer) {
      this.page++;
      this.getUsers();
    }
  }
}
