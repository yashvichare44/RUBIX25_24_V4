import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class RegisterComponent {
  registerForm: FormGroup;

  // Predefined static inputs for testing
  private staticUsername = 'testuser';
  private staticEmail = 'testuser@example.com';
  private staticPassword = 'password123';

  constructor(private fb: FormBuilder) {
    // Initialize the form with static inputs
    this.registerForm = this.fb.group({
      username: [this.staticUsername, [Validators.required, Validators.minLength(3)]],
      email: [this.staticEmail, [Validators.required, Validators.email]],
      password: [this.staticPassword, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;

      // Validate against static values for demonstration
      if (
        username === this.staticUsername &&
        email === this.staticEmail &&
        password === this.staticPassword
      ) {
        console.log('Static Registration Successful:', this.registerForm.value);
        alert('Registration successful!');
      } else {
        console.log('Static Registration Failed');
        alert('Invalid registration details.');
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    if (controlName === 'email' && control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (controlName === 'password' && control?.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    if (controlName === 'username' && control?.hasError('minlength')) {
      return 'Username must be at least 3 characters long';
    }
    return '';
  }
}