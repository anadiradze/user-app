import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user-service.service';
import { IData, IUser, IUsers } from '../user-list/models/user.model';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user!: IUser;
  friends: IUsers[] = [];
  page = 0;
  size = 25;
  isLoading = false;
  hasMoreData = true;

  @ViewChild('friendsList', { static: false }) friendsList?: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.getUser(userId);
      this.getFriends(userId);
    }
  }

  getFriends(userId: string) {
    this.isLoading = true;
    this.userService
      .getFriends(parseInt(userId), this.page, this.size)
      .subscribe((data: IData) => {
        this.friends = this.friends.concat(data.list);
        this.isLoading = false;
        if (data.list.length < this.size) {
          this.hasMoreData = false;
        }
      });
  }

  getUser(userId: string) {
    this.isLoading = true;
    this.userService.getUser(parseInt(userId)).subscribe((data: IUser) => {
      this.user = data;
      this.isLoading = false;
    });
  }
  goToMainPage() {
    this.router.navigate(['/']);
  }
  onScrollFriends() {
    const friendsListEl = this.friendsList?.nativeElement;
    const userId = this.route.snapshot.paramMap.get('id');
    this.userService.onScroll(
      this.page,
      this.hasMoreData,
      this.isLoading,
      friendsListEl,
      (page: number) => {
        if (userId) {
          this.page = page;
          this.getFriends(userId);
        }
      }
    );
  }

  getUserWithFriends(FriendsId: string) {
    if (FriendsId) {
      this.getUser(FriendsId);
      this.friends = [];
      this.getFriends(FriendsId);
     this.router.navigateByUrl(`user/${FriendsId}`)
    }
  }
}
