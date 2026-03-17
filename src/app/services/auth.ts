import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase';
import { IUser } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Inject the SupabaseService to access the client
  private supabase = inject(SupabaseService).client;

  // BehaviorSubject to track authentication state
  private authState = new BehaviorSubject<string>('Guest');

  // Expose authState as an observable for components to subscribe to
  public authState$ = this.authState.asObservable();

  async notifyAuthState(): Promise<void> {
    // Check if there's a real session first
    const user = await this.getCurrentUser();

    if (user) {
      // If there's a logged-in user, set the auth state to their name and clear any guest mode flag
      localStorage.removeItem('isGuestMode');
      this.authState.next(user.name);
    } else {
      // If no user is logged in, set the auth state to "Guest" and set a flag in localStorage
      this.authState.next('Guest');
    }
  }

  // Register a new user and store the name in metadata
  async register(name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          // Supabase UI picks this up for "Display Name"
          full_name: name,
        }
      }
    });

    if (error)
      return { success: false, error: error.message };
    return { success: true };
  }

  // Login with email and password
  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error)
      return { success: false, error: error.message };
    return { success: true };
  }

  // Get the currently logged-in user mapped to IUser
  async getCurrentUser(): Promise<IUser | null> {
    const { data: { user } } = await this.supabase.auth.getUser();

    if (!user || !user.email)
      return null;

    return {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.['full_name'] || 'Guest'
    };
  }

  // Update user details
  async updateUser(name?: string, password?: string): Promise<{ success: boolean; error?: string }> {
    const updates: any = {};

    // Update metadata if name is provided
    if (name)
      updates.data = { full_name: name };
    // Update password if provided (Supabase handles encryption automatically)
    if (password)
      updates.password = password;

    const { error } = await this.supabase.auth.updateUser(updates);

    if (error)
      return { success: false, error: error.message };
    return { success: true };
  }

  // Logout the user
  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
  }

}
