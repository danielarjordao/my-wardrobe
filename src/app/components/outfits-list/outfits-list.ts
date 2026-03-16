import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/clothing-item';
import { Outfit } from '../../models/outfit';
import { OutfitService } from '../../services/outfit';
import { ModalService } from '../../services/modal';
import { OutfitCard } from '../../resources/outfit-card/outfit-card';
import { ItemCard } from '../../resources/item-card/item-card';

@Component({
  selector: 'app-outfits-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, OutfitCard, ItemCard],
  templateUrl: './outfits-list.html',
  styleUrl: './outfits-list.css',
})
export class Outfits implements OnInit {
  private wardrobeService = inject(WardrobeService);
  private outfitService = inject(OutfitService);
  private modalService = inject(ModalService);

  wardrobeItems: ClothingItem[] = [];
  savedOutfits: Outfit[] = [];
  searchTerm = '';
  filteredOutfits: Outfit[] = [];

  selectedOutfitToView: Outfit | null = null;
  outfitItemsToShow: ClothingItem[] = [];

  /** Inserted by Angular inject() migration for backwards compatibility */
  /*
  constructor(...args: unknown[]);

  constructor() {
    this.loadData();
  }
  */

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.wardrobeItems = this.wardrobeService.getAllItems();
    this.savedOutfits = this.outfitService.getAllOutfits();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredOutfits = this.savedOutfits.filter((outfit) => {
      const matchesSearch =
        outfit.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        outfit.trip.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesSearch;
    });
  }

  async deleteOutfit(id: string): Promise<void> {
    const shouldDelete = await this.modalService.confirm(
      'Are you sure you want to delete this look?',
      { title: 'Delete look', variant: 'error' }
    );

    if (shouldDelete) {
      this.outfitService.deleteOutfit(id);
      this.loadData();
    }
  }

  openModal(outfit: Outfit): void {
    this.selectedOutfitToView = outfit;
    this.outfitItemsToShow = this.wardrobeItems.filter((item) => outfit.itemIds.includes(item.id));
  }

  closeModal(): void {
    this.selectedOutfitToView = null;
    this.outfitItemsToShow = [];
  }
}
