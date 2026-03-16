import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    // Initialize Supabase client using environment variables
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

}
