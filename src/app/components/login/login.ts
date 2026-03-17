import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ModalService } from '../../services/modal';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginForm implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private modalService = inject(ModalService);

  // State flags for the 3 modes
  isLoggedIn = false;
  isEditMode = false;
  isRegisterMode = false;

  errorMsg = '';
  currentUser: IUser | null = null;

  // Initialize the form (fields will be dynamically disabled/enabled)
  accountForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  // Check if a user is already logged in when the page loads
  async ngOnInit(): Promise<void> {
    // Check if the URL has "/redir" to determine if it's an initial access or a direct navigation to /login
    const isRedir = this.router.url.includes('redir');

    if (isRedir) {
      // If it's a redirection, we check if there's an active session. If there is, we go to the dashboard. If not, we just load the login form.
      const user = await this.authService.getCurrentUser();

      if (user) {
        // User is logged in, redirect to dashboard
        this.router.navigate(['/dashboard']);
        return;
      } else {
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    }
    await this.loadUserProfile();
  }

  // Load user data and set the initial state (Read-Only if logged in)
  async loadUserProfile(): Promise<void> {
    this.currentUser = await this.authService.getCurrentUser();

    if (this.currentUser) {
      this.isLoggedIn = true;
      this.isEditMode = false;

      this.accountForm.patchValue({
        name: this.currentUser.name,
        email: this.currentUser.email,
        // Password is never pre-filled for security reasons
        password: ''
      });

      // Disable the form fields in read-only mode
      this.accountForm.disable();
    } else {
      this.isLoggedIn = false;
      this.setLoginMode();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.accountForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  enableEditing(): void {
    this.isEditMode = true;
    this.accountForm.enable();

    // Email changes require email confirmation in Supabase, it's safer to keep it read-only in the profile edit mode
    this.accountForm.get('email')?.disable();

    // Password becomes optional during edit mode
    this.accountForm.get('password')?.clearValidators();
    this.accountForm.get('password')?.setValidators([Validators.minLength(6)]);
    this.accountForm.get('password')?.updateValueAndValidity();
  }

  cancelEditing(): void {
    this.isEditMode = false;
    this.errorMsg = '';

    // Revert form values to the original user data
    if (this.currentUser) {
      this.accountForm.patchValue({
        name: this.currentUser.name,
        password: ''
      });
    }
    this.accountForm.disable();
  }

  setRegisterMode(): void {
    this.isRegisterMode = true;
    this.errorMsg = '';
    this.accountForm.reset();
    this.accountForm.enable();

    // Name is required for registration
    this.accountForm.get('name')?.setValidators([Validators.required, Validators.minLength(2)]);
    this.accountForm.get('name')?.updateValueAndValidity();
  }

  setLoginMode(): void {
    this.isRegisterMode = false;
    this.errorMsg = '';
    this.accountForm.reset();
    this.accountForm.enable();

    // Name is NOT required for login
    this.accountForm.get('name')?.clearValidators();
    this.accountForm.get('name')?.updateValueAndValidity();
  }

  async onSubmit(): Promise<void> {
    this.errorMsg = '';

    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    // getRawValue() ensures we get the email even if the field is disabled
    const { name, email, password } = this.accountForm.getRawValue();
    if (this.isLoggedIn && this.isEditMode) {
      // 1. Update profile mode
      const result = await this.authService.updateUser(name as string, password as string);
      if (result.success) {
        this.modalService.open('Profile updated successfully!', { title: 'Success', variant: 'success' });
        await this.loadUserProfile();
        await this.authService.notifyAuthState();
      } else {
        this.errorMsg = result.error || 'Failed to update profile.';
      }
    } else if (this.isRegisterMode) {
      // 2. Registration mode
      const result = await this.authService.register(name as string, email as string, password as string);
      if (result.success) {
        this.modalService.open('Account created successfully! You can now log in.', { title: 'Success', variant: 'success' });
        this.setLoginMode();
      } else {
        this.errorMsg = result.error || 'Registration failed.';
      }
    } else {
      // 3. Login mode
      const result = await this.authService.login(email as string, password as string);
      if (result.success) {
        await this.authService.notifyAuthState();
        this.modalService.open(`Welcome back!`, { title: 'Login successful', variant: 'success' });
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMsg = result.error || 'Invalid email or password.';
        this.accountForm.get('password')?.reset();
      }
    }
  }

  async onLogout(): Promise<void> {
    await this.authService.logout();
    localStorage.removeItem('isGuestMode');
    await this.authService.notifyAuthState(); // Update auth state to reflect logout
    this.isLoggedIn = false;
    this.setLoginMode();
  }

  continueAsGuest(): void {
    localStorage.setItem('isGuestMode', 'true');
    this.authService.notifyAuthState(); // Update auth state to reflect guest mode
    this.router.navigate(['/dashboard']);
  }
}
