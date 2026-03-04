import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/clothing-item';
import { on } from 'events';

// Custom Validator function for the Image URL
export function urlValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null; // Let the 'required' validator handle empty fields
  const isValid = control.value.startsWith('http://') || control.value.startsWith('https://');
  return isValid ? null : { invalidUrl: true };
}

@Component({
  selector: 'app-item-form',
  standalone: true,
  // ReactiveFormsModule is MANDATORY for this requirement
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './item-form.html',
  styleUrl: './item-form.css'
})

export class ItemForm {
  itemForm!: FormGroup;
  isEditMode: boolean = false;
  currentItemId: string | null = null;

  // Dropdown options from service
  categories: string[] = [];
  statuses: string[] = [];
  colors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private wardrobeService: WardrobeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loadDropdownData();
    this.initializeForm();
    this.checkIfEditMode();
  }


  // --- Initialization Methods ---

  loadDropdownData(): void {
    this.categories = this.wardrobeService.availableCategories;
    this.statuses = this.wardrobeService.availableStatuses;
    this.colors = this.wardrobeService.availableColors;
  }

  initializeForm(): void {
    // 3 required fields and 1 custom validation (urlValidator)
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      color: ['', Validators.required],
      brand: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, urlValidator]],
      status: ['Available', Validators.required],
      notes: ['']
    });
  }

  checkIfEditMode(): void {
    // Read the ID from the URL (e.g., /clothes/edit/123)
    this.currentItemId = this.route.snapshot.paramMap.get('id');

    if (this.currentItemId) {
      this.isEditMode = true;
      const itemToEdit = this.wardrobeService.getItemById(this.currentItemId);

      if (itemToEdit) {
        // Fill the form with the existing data
        this.itemForm.patchValue(itemToEdit);
      } else {
        // If ID is invalid, send back to list
        this.router.navigate(['/clothes']);
      }
    }
  }

  // --- Helper Methods for HTML ---

  // Check if a specific field is invalid and was touched by the user
  isFieldInvalid(fieldName: string): boolean {
    const field = this.itemForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  // --- Action Methods ---

  onSubmit(): void {
    // Force validation trigger if user clicks submit without touching fields
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const formData = this.itemForm.value as ClothingItem;

    if (this.isEditMode && this.currentItemId) {
      // Add the ID back before updating
      formData.id = this.currentItemId;
      // Preserve creation date
      const existingItem = this.wardrobeService.getItemById(this.currentItemId);
      formData.createdAt = existingItem ? existingItem.createdAt : new Date();

      this.wardrobeService.updateItem(formData);
    } else {
      this.wardrobeService.addItem(formData);
    }

    // Go back to the wardrobe list
    this.router.navigate(['/clothes']);
  }

  onDelete(): void {
    if (this.currentItemId) {
      // Adicionamos um alerta simples para evitar apagar sem querer
      const confirmDelete = confirm('Are you sure you want to delete this item?');
      if (confirmDelete) {
        this.wardrobeService.deleteItem(this.currentItemId);
        this.router.navigate(['/clothes']); // Volta para a lista após apagar
      }
    }
  }
}
