import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from '../../services/auth';
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

  isRegisterMode = false;

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
    this.loginForm.reset();
  }

  onBackToLoginClick(): void {
    this.isRegisterMode = false;
    this.loginForm.reset();
  }

  // A method to handle form submission
  async onSubmit(): Promise<void> {
    // First, check if the form is valid
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

        // Call the AuthService to create the user (this will send a POST request to the backend)
        await this.authService.createUser(newUser);

        alert('Account created successfully! You can now log in.');
        // After successful registration, switch back to login mode
        this.onBackToLoginClick();
      } else {
        // Login mode: Validate the user's credentials
        // Get the list of users from the backend (this will send a GET request)
        const users = await this.authService.loadUsers();

        // Check if there's a user that matches the provided username and password
        const validUser = users.find(((user: any) => user.username === credentials.username && user.password === credentials.password)
        );

        if (validUser) {
          alert(`Welcome back, ${validUser.username}!`);

          // redirect to the dashboard after successful login
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid username or password.');
          // Clear the password field for security reasons
          this.loginForm.get('password')?.reset();
        }
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
