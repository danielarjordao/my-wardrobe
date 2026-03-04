import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/clothing-item';

@Component({
  selector: 'app-outfits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './outfits.html',
  styleUrl: './outfits.css'
})
export class Outfits implements OnInit {
  // Data arrays
  wardrobeItems: ClothingItem[] = [];
  savedOutfits: any[] = [];

  // Form state for new outfit
  newOutfitName: string = '';
  selectedItemIds: string[] = [];

  constructor(private wardrobeService: WardrobeService) {}

  ngOnInit(): void {
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

  // Helper function to map IDs back to full ClothingItem objects for display
  getItemsForOutfit(itemIds: string[]): ClothingItem[] {
    return this.wardrobeItems.filter(item => itemIds.includes(item.id));
  }
}
