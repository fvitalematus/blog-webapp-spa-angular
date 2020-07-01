import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Identificate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      response => {
        // TOKEN
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;

          // OBJETO DE USUARIO IDENTIFICADO
          this._userService.signup(this.user, true).subscribe(
            response => {
              this.identity = response;              

              // PERSISTIR DATOS USUARIO IDENTIFICADO
              console.log(this.token);
              console.log(this.identity);
              
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );

        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

}
