import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule,CommonModule],
})
export class LoginComponent {
  loginForm: FormGroup;

  // Predefined static credentials for testing
  private staticUsername = 'admin';
  private staticPassword = 'password123';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (username === this.staticUsername && password === this.staticPassword) {
        alert('Login successful!');
        this.router.navigate(['/home']); // Redirect to the dashboard
      } else {
        alert('Invalid credentials!');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    if (controlName === 'password' && control?.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }
}