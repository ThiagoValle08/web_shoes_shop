import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { get } from 'http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  signInForm: FormGroup;
  signUpForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      username: ['', []],
      password: ['', []],
    });

    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    this.errorMessage = '';

    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;
      const success = this.authService.login(username, password);
      if (success) {
        this.router.navigate(['/adminHome']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    }
  }

  toggleForm(form: string) {
    const container = document.querySelector('.container');
    if (form === 'signUp') {
      container?.classList.add('sign-up-mode');
    } else {
      container?.classList.remove('sign-up-mode');
    }
  }

  get signInControls() {
    return this.signInForm.controls;
  }

  get signUpControls() {
    return this.signUpForm.controls;
  }
}
