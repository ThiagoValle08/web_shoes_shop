import { Component } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'shoesShop';
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.navigate(['/home']);
  }
}
