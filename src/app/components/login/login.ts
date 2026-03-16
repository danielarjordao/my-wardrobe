import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ModalService } from '../../services/modal';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginForm {
  private router = inject(Router);
  private authService = inject(AuthService);
  private modalService = inject(ModalService);

  isRegisterMode = false;
  errorMsg = '';

  // Initialize the login form with validation
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  // Helper method to check if a form field is invalid and touched
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onRegisterClick(): void {
    this.isRegisterMode = true;
    this.errorMsg = '';
    this.loginForm.reset();
  }

  onBackToLoginClick(): void {
    this.isRegisterMode = false;
    this.errorMsg = '';
    this.loginForm.reset();
  }

  // A method to handle form submission
  async onSubmit(): Promise<void> {
    this.errorMsg = '';

    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      if (this.isRegisterMode) {
        // Register mode: Create a new user
        const newUser: User = {
          id: Date.now().toString(), // Simple unique ID based on timestamp
          username: credentials.username as string,
          password: credentials.password as string,
          createdAt: new Date()
        };

        const result = await this.authService.createUser(newUser);

        if (result.success) {
          this.modalService.open('Account created successfully! You can now log in.', {
            title: 'Success',
            variant: 'success'
          });
          this.onBackToLoginClick();
        } else {
          this.errorMsg = result.error || 'Registration failed.';
        }
      } else {
        // Login mode: Validate the user's credentials (case-insensitive)
        const result = await this.authService.login(
          credentials.username as string,
          credentials.password as string
        );

        if (result.success && result.user) {
          this.modalService.open(`Welcome back, ${result.user.username}!`, {
            title: 'Login successful',
            variant: 'success'
          });

          // Save the logged-in user in localStorage (without password for security reasons)
          this.authService.setCurrentUser(result.user);

          this.router.navigate(['/dashboard']);
        } else {
          this.errorMsg = result.error || 'Invalid username or password.';
          this.loginForm.get('password')?.reset();
        }
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // Method to allow users to continue as guests without logging in
  continueAsGuest(): void {
    const guestUser: User = {
      id: 'guest_' + Date.now().toString(),
      username: 'Visitante',
      password: '',
      createdAt: new Date()
    };

    // Store the guest user in localStorage (without password for security reasons)
    this.authService.setCurrentUser(guestUser);

    // Navigate to the dashboard as a guest
    this.router.navigate(['/dashboard']);
  }
}
