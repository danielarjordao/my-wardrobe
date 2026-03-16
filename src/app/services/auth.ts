import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../environments/environment.development';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;

  constructor() {
    // Initialize Supabase client
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // Load all users (for debugging purposes, not used in production)
  async getUsers() {
    const { data, error } = await this.supabase
      // Query the 'users' table to retrieve all users
      .from('users')
      .select('*');

    if (error) {
      console.error('Error loading users:', error);
      return [];
    }
    return data;
  }

  // Check if username exists (case-insensitive directly in the database using .ilike)
  async usernameExists(username: string): Promise<boolean> {
    const { data } = await this.supabase
      // Query the 'users' table to check for a case-insensitive match of the username
      .from('users')
      .select('username')
      .ilike('username', username) // Case-insensitive match
      .maybeSingle(); // Returns the record if found, or null if not

    // If data is returned, the username exists; if null, it does not
    return !!data;
  }

  // Create a new user
  async createUser(user: User): Promise<{ success: boolean; error?: string }> {
    // Check for duplicate username before creating the user
    const exists = await this.usernameExists(user.username);
    if (exists) {
      return { success: false, error: 'Username already exists.' };
    }

    // Insert the user directly into the Supabase 'users' table
    const { error } = await this.supabase
    // Insert the new user into the 'users' table
      .from('users')
      .insert([user]);

    if (error) {
      console.error('Insert error:', error);
      return { success: false, error: 'Failed to create user.' };
    }

    return { success: true };
  }

// Login: find user by username/password
  async login(username: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Query the database directly for a match
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .ilike('username', username)
      .eq('password', password) // Exact match for password (case-sensitive)
      .maybeSingle();

    // Log the error for debugging purposes if the database request fails
    if (error) {
      console.error('Supabase login error:', error.message);
    }

    // If a valid user is found, return success
    if (data) {
      return { success: true, user: data as User };
    } else {
      return { success: false, error: 'Invalid username or password.' };
    }
  }

  // Store the logged-in user in localStorage (without password for security reasons)
  setCurrentUser(user: User | null): void {
    if (user) {
      const userWithoutPassword = {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt
      };
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  // Retrieve the current logged-in user from localStorage
  getCurrentUser(): Partial<User> | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }
}
