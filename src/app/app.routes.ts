import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { WardrobeList } from './pages/wardrobe-list/wardrobe-list';
import { ItemForm } from './pages/item-form/item-form';
import { Outfits } from './pages/outfits/outfits';

export const routes: Routes = [
  // Redirect empty path to dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Main pages
  { path: 'dashboard', component: Dashboard },
  { path: 'clothes', component: WardrobeList },
  { path: 'outfits', component: Outfits },

  // Forms (Create and Edit use the same component)
  { path: 'clothes/new', component: ItemForm },
  { path: 'clothes/edit/:id', component: ItemForm },
];
