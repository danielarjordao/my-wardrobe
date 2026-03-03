import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/clothing-item';

@Component({
  selector: 'app-wardrobe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './wardrobe-list.html',
  styleUrl: './wardrobe-list.css'
})
export class WardrobeList {
  items: ClothingItem[] = [];

  searchTerm: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';
  selectedSort: string = '';

  categories: string[] = [];
  statuses: string[] = [];
  sortOptions: string[] = [];

  constructor(private wardrobeService: WardrobeService) {
    this.items = this.wardrobeService.getAllItems();
    this.categories = this.wardrobeService.availableCategories;
    this.statuses = this.wardrobeService.availableStatuses;
    // Garante que esta variável existe no teu service, ou muda para um array estático aqui
    this.sortOptions = this.wardrobeService.sortOptions;
  }

  searchFilter(items: ClothingItem[], term: string): ClothingItem[] {
    if (!term) return items;
    const lowerTerm = term.toLowerCase();
    return items.filter(item =>
      item.name.toLowerCase().includes(lowerTerm) ||
      item.brand.toLowerCase().includes(lowerTerm)
    );
  }

  categoryFilter(items: ClothingItem[], category: string): ClothingItem[] {
    if (!category) return items;
    return items.filter(item => item.category === category);
  }

  statusFilter(items: ClothingItem[], status: string): ClothingItem[] {
    if (!status) return items;
    return items.filter(item => item.status === status);
  }

  sortedItenms(items: ClothingItem[], sortOption: string): ClothingItem[] {
    switch (sortOption) {
      case 'Newest':
        return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'Oldest':
        return items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'Price: Low to High':
        return items.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'Price: High to Low':
        return items.sort((a, b) => (b.price || 0) - (a.price || 0));
      default:
        return items;
    }
  }

  // A palavra 'get' transforma isto numa variável dinâmica que o HTML consegue ler sempre que os filtros mudam
  get filteredAndSortedItems(): ClothingItem[] {
    // CÓPIA DO ARRAY: Isto resolve o problema de performance!
    let result = [...this.items];

    if (this.searchTerm) result = this.searchFilter(result, this.searchTerm);
    if (this.selectedCategory) result = this.categoryFilter(result, this.selectedCategory);
    if (this.selectedStatus) result = this.statusFilter(result, this.selectedStatus);

    result = this.sortedItenms(result, this.selectedSort);

    return result;
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Available': return 'status-green';
      case 'In Laundry': return 'status-yellow';
      case 'Packed': return 'status-blue';
      default: return 'status-gray';
    }
  }
}
