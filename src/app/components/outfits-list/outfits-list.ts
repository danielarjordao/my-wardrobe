import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/clothing-item';
import { Outfit } from '../../models/outfit';
import { OutfitService } from '../../services/outfit';
import { OutfitCard } from '../../resources/outfit-card/outfit-card';

@Component({
  selector: 'app-outfits-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, OutfitCard],
  templateUrl: './outfits-list.html',
  styleUrl: './outfits-list.css'
})
export class Outfits {
  wardrobeItems: ClothingItem[] = [];
  savedOutfits: Outfit[] = [];
  searchTerm: string = '';
  filteredOutfits: Outfit[] = [];

  constructor(
    private wardrobeService: WardrobeService,
    private outfitService: OutfitService
  ) {
    this.loadData();
  }

  loadData(): void {
    this.wardrobeItems = this.wardrobeService.getAllItems();
    this.savedOutfits = this.outfitService.getAllOutfits();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredOutfits = this.savedOutfits.filter(outfit => {
      const matchesSearch = outfit.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || outfit.trip.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesSearch;
    });
  }

  deleteOutfit(id: string): void {
    if (confirm('Are you sure you want to delete this look?')) {
      this.outfitService.deleteOutfit(id);
      this.loadData();
    }
  }
}
