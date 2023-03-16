import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string =
    'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com';

  constructor(private http: HttpClient) {}

  getUsers(page: number, size: number) {
    return this.http.get(`${this.apiUrl}/user/${page}/${size}`);
  }

  getUser(userId: number) {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  getFriends(userId: number, page: number, size: number) {
    return this.http.get(
      `${this.apiUrl}/user/${userId}/friends/${page}/${size}`
    );
  }
}
