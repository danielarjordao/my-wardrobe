import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/clothing-item';
import { ItemCard } from '../../resources/item-card/item-card';
import {
  availableCategories,
  availableStatuses,
  availableColors,
  availableSortOptions,
} from '../../models/item-options';
import { FilterUtils } from '../../utils/filter.utils';

@Component({
  selector: 'app-wardrobe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemCard, RouterLink],
  templateUrl: './wardrobe-list.html',
  styleUrl: './wardrobe-list.css',
})
export class WardrobeList implements OnInit {
  private wardrobeService = inject(WardrobeService);

  items: ClothingItem[] = [];
  filteredAndSortedItems: ClothingItem[] = [];

  categories: string[] = availableCategories;
  statuses: string[] = availableStatuses;
  colors: string[] = availableColors;
  sortOptions: string[] = availableSortOptions;

  searchTerm = '';
  selectedCategory = '';
  selectedStatus = '';
  selectedColor = '';
  selectedSort = '';

  /** Inserted by Angular inject() migration for backwards compatibility */
  /*
  constructor(...args: unknown[]);

  constructor() {
    this.items = this.wardrobeService.getAllItems();
    this.categories = availableCategories;
    this.statuses = availableStatuses;
    this.colors = availableColors;
    this.sortOptions = availableSortOptions;
    this.applyFilters();
  }
  */

  ngOnInit(): void {
    this.items = this.wardrobeService.getAllItems();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredAndSortedItems = FilterUtils.apply(this.items, {
      searchTerm: this.searchTerm,
      category: this.selectedCategory,
      status: this.selectedStatus,
      color: this.selectedColor,
      sortOption: this.selectedSort,
    });
  }
}
