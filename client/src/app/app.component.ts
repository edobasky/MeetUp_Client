import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { user } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users : any;

  constructor(private http:HttpClient, private accountService : AccountService){}

  ngOnInit() {
     
      this.setCurrentUser();
  }

  setCurrentUser() {
    const user: user = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}