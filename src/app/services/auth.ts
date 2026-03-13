import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  // This service will be available throughout the app without needing to add it to any module's providers array
  providedIn: 'root'
})
export class AuthService {

  // Get users
  async loadUsers() {
    const response = await fetch(environment.apiUrl + '/users');
    const users = await response.json();

    return users;
  }

  // Create a new user
  async createUser(user: User) {
    const response = await fetch(environment.apiUrl + '/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // Convert the user object to a JSON string before sending it in the request body
      body: JSON.stringify(user)
    });

    const data = await response.json();
    return data;
  }
}
