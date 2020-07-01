import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  public title = 'blog-webapp-spa-angular';
  public identity;
  public token;

  constructor(
    public _userService: UserService
  ){
    this.identity = this._userService.getIdentity();
  }
}
