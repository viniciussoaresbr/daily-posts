import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user: IUser | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe(isAuth => {
      this.isLoggedIn = isAuth;
      if (isAuth) {
        const userId = this.authService.getUserId();
        if (userId) {
          this.userService
            .getUserById(userId)
            .subscribe(user => (this.user = user));
        }
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
