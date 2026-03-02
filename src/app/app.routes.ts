import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { WardrobeList } from './pages/wardrobe-list/wardrobe-list';
import { ItemDetail } from './pages/item-detail/item-detail';
import { ItemForm } from './pages/item-form/item-form';

export const routes: Routes = [
  // Redirect empty path to dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Main pages
  { path: 'dashboard', component: Dashboard },
  { path: 'clothes', component: WardrobeList },

  // Forms (Create and Edit use the same component)
  { path: 'clothes/new', component: ItemForm },
  { path: 'clothes/edit/:id', component: ItemForm },

  // Dynamic route for details
  { path: 'clothes/detail/:id', component: ItemDetail },

  // Wildcard route for a 404 page (redirects to dashboard for now)
  { path: '**', redirectTo: '/dashboard' }
];
