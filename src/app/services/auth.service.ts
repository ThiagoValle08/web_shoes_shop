import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  private loggindata = [
    { user: 'diego', password: '1037601503' },
    { user: 'yenni', password: '1037641514' },
    { user: '', password: '' },
  ];

  constructor(private router: Router) {}

  login(user: string, password: string): boolean {
    const validUser = this.loggindata.find(
      (data) => data.user === user.toLowerCase() && data.password === password
    );

    if (validUser) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/Home']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
