import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/clothing-item';
import { Outfit } from '../../models/outfit';
import { OutfitService } from '../../services/outfit';
import { availableCategories, availableStatuses, availableColors } from '../../models/item-options';
import { FilterUtils } from '../../utils/filter.utils';

@Component({
  selector: 'app-outfits-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './outfit-form.html',
  styleUrl: './outfit-form.css'
})
export class OutfitForm {

  itemForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    trip: new FormControl('', [Validators.required, Validators.minLength(3)]),
    itemIds: new FormControl<string[]>([], [Validators.required, this.minSelectedItemsValidator])
  });

  wardrobeItems: ClothingItem[] = [];
  savedOutfits: Outfit[] = [];
  filteredItems: ClothingItem[] = [];

  selectedCategory: string = '';
  selectedStatus: string = '';
  selectedColor: string = '';

  categories: string[] = [];
  statuses: string[] = [];
  colors: string[] = [];

  constructor(
    private wardrobeService: WardrobeService,
    private outfitService: OutfitService,
    private router: Router
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

  applyFilters(): void {
    this.filteredItems = FilterUtils.apply(this.wardrobeItems, {
      category: this.selectedCategory,
      status: this.selectedStatus,
      color: this.selectedColor
    });
  }

  // --- Selection Logic ---
  toggleSelection(id: string): void {
    const currentIds = this.itemForm.get('itemIds')?.value as string[];
    const index = currentIds.indexOf(id);

    if (index > -1) {
      currentIds.splice(index, 1);
    } else {
      currentIds.push(id);
    }

    this.itemForm.get('itemIds')?.setValue([...currentIds]);
    this.itemForm.get('itemIds')?.markAsTouched();
  }

  isSelected(id: string): boolean {
    const currentIds = this.itemForm.get('itemIds')?.value as string[];
    return currentIds.includes(id);
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const formValue = this.itemForm.value;

      this.outfitService.addOutfit({
        name: formValue.name,
        trip: formValue.trip,
        itemIds: formValue.itemIds
      });

      this.router.navigate(['/outfits']);
    } else {
      this.itemForm.markAllAsTouched();
    }
  }

  minSelectedItemsValidator(control: AbstractControl): ValidationErrors | null {
    const selectedItems = control.value as string[];
    return selectedItems && selectedItems.length > 0 ? null : { minSelectedItems: true };
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.itemForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }
}
