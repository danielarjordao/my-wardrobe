import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/clothing-item';
import { Outfit } from '../../models/outfit';
import { OutfitService } from '../../services/outfit';
import { availableCategories, availableStatuses, availableColors  } from '../../models/item-options';
import { FilterUtils } from '../../utils/filter.utils';

@Component({
  selector: 'app-outfits-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './outfit-form.html',
  styleUrl: './outfit-form.css'
})

export class OutfitForm {
  wardrobeItems: ClothingItem[] = [];
  savedOutfits: Outfit[] = [];

  filteredItems: ClothingItem[] = [];

  newOutfitName: string = '';
  selectedItemIds: string[] = [];
  selectedCategory: string = '';
  selectedStatus: string = '';
  selectedColor: string = '';

  categories: string[] = [];
  statuses: string[] = [];
  colors: string[] = [];

  constructor(
    private wardrobeService: WardrobeService,
    private outfitService: OutfitService
  ) {
    this.categories = availableCategories;
    this.statuses = availableStatuses;
    this.colors = availableColors;
    this.loadData();
  }

  loadData(): void {
    this.wardrobeItems = this.wardrobeService.getAllItems();
    this.savedOutfits = this.outfitService.getAllOutfits();
    this.applyFilters();
  }

  // Call this whenever the category or status filters change
  applyFilters(): void {
    this.filteredItems = FilterUtils.apply(this.wardrobeItems, {
      category: this.selectedCategory,
      status: this.selectedStatus,
      color: this.selectedColor
    });
  }

  // --- Selection Logic ---
  toggleSelection(id: string): void {
    const index = this.selectedItemIds.indexOf(id);
    if (index > -1) {
      this.selectedItemIds.splice(index, 1);
    } else {
      this.selectedItemIds.push(id);
    }
  }

  isSelected(id: string): boolean {
    return this.selectedItemIds.includes(id);
  }

  // --- Outfit Management ---
  saveOutfit(): void {
    if (!this.newOutfitName.trim() || this.selectedItemIds.length === 0) return;

    this.outfitService.addOutfit(this.newOutfitName.trim(), this.selectedItemIds);
    this.newOutfitName = '';
    this.selectedItemIds = [];
    this.loadData();
  }

}
