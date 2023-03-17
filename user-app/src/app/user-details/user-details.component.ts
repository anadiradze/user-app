
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
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
  size = 50;
  isLoading = false;
  hasMoreData = true;

  @ViewChild('friendsList', { static: false }) friendsList?: ElementRef;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.getUser(userId);
      this.getFriends(userId);
    }
  }
onclickito(){
  console.log('lalala')
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
    const friendsListEl = this.friendsList?.nativeElement;
    const isScrolledToBottom = friendsListEl.scrollHeight - friendsListEl.scrollTop === friendsListEl.clientHeight;
    if (!this.isLoading && this.hasMoreData && isScrolledToBottom) {
      this.page++;
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.getFriends(userId);
      }
    }
  }
  goToMainPage() {
    this.router.navigate(['/']);
  }
}
