import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/clothing-item';
import { Outfit } from '../../models/outfit';

@Component({
  selector: 'app-outfits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './outfits.html',
  styleUrl: './outfits.css'
})
export class Outfits {
  // Data arrays
  wardrobeItems: ClothingItem[] = [];
  savedOutfits: Outfit[] = [];

  // Form state for new outfit
  newOutfitName: string = '';
  selectedItemIds: string[] = [];

  selectedCategory: string = '';
  selectedStatus: string = '';


  categories: string[] = [];
  statuses: string[] = [];
  sortOptions: string[] = [];

  constructor(private wardrobeService: WardrobeService) {
    this.categories = this.wardrobeService.availableCategories;
    this.statuses = this.wardrobeService.availableStatuses;
    this.loadData();
  }

  loadData(): void {
    this.wardrobeItems = this.wardrobeService.getAllItems();
    this.savedOutfits = this.wardrobeService.getOutfits();
  }

  // --- Outfit Creation Logic ---
  toggleSelection(id: string): void {
    const index = this.selectedItemIds.indexOf(id);
    if (index > -1) {
      // Remove if already selected
      this.selectedItemIds.splice(index, 1);
    } else {
      // Add if not selected
      this.selectedItemIds.push(id);
    }
  }

  isSelected(id: string): boolean {
    return this.selectedItemIds.includes(id);
  }

  saveOutfit(): void {
    // Prevent saving empty outfits
    if (!this.newOutfitName.trim() || this.selectedItemIds.length === 0) return;

    this.wardrobeService.addOutfit(this.newOutfitName, this.selectedItemIds);

    // Reset form after saving
    this.newOutfitName = '';
    this.selectedItemIds = [];

    // Refresh the list
    this.loadData();
  }

  // --- Outfit Display Logic ---
  deleteOutfit(id: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this look?');
    if (confirmDelete) {
      this.wardrobeService.deleteOutfit(id);
      this.loadData();
    }
  }

  get filteredAndSortedItems(): ClothingItem[] {
    // CÓPIA DO ARRAY: Isto resolve o problema de performance!
    let result = [...this.wardrobeItems];

    if (this.selectedCategory) result = this.categoryFilter(result, this.selectedCategory);
    if (this.selectedStatus) result = this.statusFilter(result, this.selectedStatus);

    return result;
  }

  // Helper function to map IDs back to full ClothingItem objects for display
  getItemsForOutfit(itemIds: string[]): ClothingItem[] {
    return this.wardrobeItems.filter(item => itemIds.includes(item.id));
  }

  categoryFilter(items: ClothingItem[], category: string): ClothingItem[] {
    if (!category) return items;
    return items.filter(item => item.category === category);
  }

  statusFilter(items: ClothingItem[], status: string): ClothingItem[] {
    if (!status) return items;
    return items.filter(item => item.status === status);
  }
}
