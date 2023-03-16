import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  friends: any[] = [];
  page = 0;
  size = 20;
  isLoading = false;
  hasMoreData = true;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.getUser(userId);
      this.getFriends(userId);
    }
  }


  getFriends(userId: string) {
    this.isLoading = true;
    this.userService.getFriends(parseInt(userId), this.page, this.size).subscribe((data: any) => {
      this.friends = this.friends.concat(data.list);
      console.log(this.friends)
      this.isLoading = false;
      if (data.length < this.size) {
        this.hasMoreData = false;
      }
    });
  }
  
  
  getUser(userId: string) {
    this.isLoading = true;
    this.userService.getUser(parseInt(userId)).subscribe((data: any) => {
      this.user = data;
      this.isLoading = false;
    });
  }
  

  onScroll() {
    if (!this.isLoading && this.hasMoreData) {
      this.page++;
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.getFriends(userId);
      }
    }
  }
}