import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Get users
  async loadUsers() {
    const response = await fetch(environment.apiUrl + '/users');
    const users = await response.json();
    return users;
  }

  // Check if username exists (case-insensitive)
  async usernameExists(username: string): Promise<boolean> {
    const users = await this.loadUsers();
    // ?. is used to safely access the username property, preventing errors if it's undefined or null.
    const exists = users.find((user: User) =>
      user.username?.toLowerCase() === username.toLowerCase()
    );
    return !!exists;
  }

  // Create a new user
  async createUser(user: User): Promise<{ success: boolean; error?: string }> {
    // Check for duplicate username before creating the user
    const exists = await this.usernameExists(user.username);
    if (exists) {
      return { success: false, error: 'Username already exists.' };
    }

    // If username is unique, proceed to create the user
    const response = await fetch(environment.apiUrl + '/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    // Check if the response is successful, if not, return an error message
    if (!response.ok) {
      return { success: false, error: 'Failed to create user.' };
    }
    return { success: true };
  }

  // Login: find user by username/password (case-insensitive username)
  async login(username: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const users = await this.loadUsers();
    // Find a user with matching username (case-insensitive) and password
    const validUser = users.find((user: User) =>
      user.username?.toLowerCase() === username.toLowerCase() && user.password === password
    );

    // If a valid user is found, return success and the user object; otherwise, return an error message
    if (validUser) {
      return { success: true, user: validUser };
    } else {
      return { success: false, error: 'Invalid username or password.' };
    }
  }

  // Store the logged-in user in localStorage (without password for security reasons)
  setCurrentUser(user: User | null): void {
    if (user) {
      // Create a new object without the password property to store in localStorage
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
