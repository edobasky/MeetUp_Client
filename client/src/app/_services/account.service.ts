import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { user } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  // reason for ReplaySubject is so that any class that wants it will subscribe to it and any changes it will be notified
  private currentUserSource = new ReplaySubject<user>(1);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http : HttpClient) { }

  login(model : user ) {
     return  this.http.post(this.baseUrl + 'account/login' ,model).pipe(
       map((response : user) => {
          const user = response;
          if(user) {
            localStorage.setItem("user", JSON.stringify(user));
            this.currentUserSource.next(user);
          }

       })
     );
  }

  register(model : any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user : user) => {
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }


  setCurrentUser(user: user) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
