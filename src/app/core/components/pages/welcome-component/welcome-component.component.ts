import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-welcome-component',
  templateUrl: './welcome-component.component.html',
  styleUrls: ['./welcome-component.component.css'],
})
export class WelcomeComponentComponent implements OnInit {
  currentDate: Date = new Date();
  currentTime: Date = new Date();
  userName: string | null = null;
  text: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getUsername();

    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  getUsername() {
    this.userName = this.authService.getCurrentUserName();
    if (this.userName === 'Yennifer') {
      this.text = 'Bienvenida';
    } else {
      this.text = 'Bienvenido';
    }
  }
}
