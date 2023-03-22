import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IData, IUser, IUsers } from './user-list/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string =
    'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com';

  constructor(private http: HttpClient) {}

  getUsers(page: number, size: number) {
    return this.http.get<IData>(`${this.apiUrl}/user/${page}/${size}`);
  }
  getUser(userId: number) {
    return this.http.get<IUser>(`${this.apiUrl}/user/${userId}`);
  }
  getFriends(userId: number, page: number, size: number) {
    return this.http.get<IData>(
      `${this.apiUrl}/user/${userId}/friends/${page}/${size}`
    );
  }
  onScroll(
    page: number,
    hasMoreData: boolean,
    isLoading: boolean,
    element: HTMLElement,
    callback: Function
  ): void {
    const isScrolledToBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight;
      console.log("isScrolledToBottom",isScrolledToBottom)
      console.log("scrollHeight", element.scrollHeight)
      console.log("element.scrollTop",element.scrollTop)
      console.log("element.clientHeight",element.clientHeight)

    if (isScrolledToBottom && !isLoading && hasMoreData) {
      page++;
      callback(page);
    }
  }
}
