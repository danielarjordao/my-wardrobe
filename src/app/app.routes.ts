import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { WardrobeList } from './components/wardrobe-list/wardrobe-list';
import { ItemForm } from './components/item-form/item-form';
import { Outfits } from './components/outfits-list/outfits-list';
import { OutfitForm } from './components/outfit-form/outfit-form';

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

  // Form (Create and Edit for outfits - reusing the same component)
  { path: 'outfits/new', component: OutfitForm },
  { path: 'outfits/edit/:id', component: OutfitForm },
];
