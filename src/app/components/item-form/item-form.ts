import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/clothing-item';
// import { availableCategories, availableColors, availableStatuses } from '../../models/item-options';

// Custom Validator function for the Image URL format
export function urlValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const isValid = control.value.startsWith('http://') || control.value.startsWith('https://');
  return isValid ? null : { invalidUrl: true };
}

// Async Validator that tries to load the image and fails if it's inaccessible
export function imageLoadValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  if (!control.value) return of(null);
  const isValidFormat = control.value.startsWith('http://') || control.value.startsWith('https://');
  if (!isValidFormat) return of(null);

  return new Observable((observer) => {
    const img = new Image();
    img.onload = () => {
      observer.next(null);
      observer.complete();
    };
    img.onerror = () => {
      observer.next({ imageNotFound: true });
      observer.complete();
    };
    img.src = control.value;
  });
}

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './item-form.html',
  styleUrl: './item-form.css',
})
export class ItemForm {
  private wardrobeService = inject(WardrobeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // --- Form Initialization ---
  itemForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    category: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    brand: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    imageUrl: new FormControl('', {
      validators: [Validators.required, urlValidator],
      asyncValidators: [imageLoadValidator],
      updateOn: 'blur',
    }),
    status: new FormControl('Available', [Validators.required]),
    notes: new FormControl(''),
  });

  isEditMode = false;
  currentItemId: string | null = null;
  isReadOnly = false;

  // Dropdown options from service
  categories: string[] = [];
  statuses: string[] = [];
  colors: string[] = [];

  /** Inserted by Angular inject() migration for backwards compatibility */
  /*
  constructor(...args: unknown[]);

  constructor() {
    this.checkIfEditMode();
    this.categories = availableCategories;
    this.statuses = availableStatuses;
    this.colors = availableColors;
  }
  */

  // --- Initialization Methods ---
  checkIfEditMode(): void {
    // Read the ID from the URL (e.g., /clothes/edit/123)
    this.currentItemId = this.route.snapshot.paramMap.get('id');

    if (this.currentItemId) {
      this.isEditMode = true;
      this.isReadOnly = true;
      const itemToEdit = this.wardrobeService.getItemById(this.currentItemId);

      if (itemToEdit) {
        // Fill the form with the existing data
        this.itemForm.patchValue(itemToEdit);
      } else {
        // If ID is invalid, send back to list
        this.router.navigate(['/clothes']);
      }

      if (this.isReadOnly) {
        this.itemForm.disable();
      }
    }
  }

  // --- Helper Methods for HTML ---

  // Check if a specific field is invalid and was touched by the user
  isFieldInvalid(fieldName: string): boolean {
    const field = this.itemForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  // --- Action Methods ---

  enableEditing(): void {
    this.isReadOnly = false;
    this.itemForm.enable();
  }

  // Handle form submission for both adding and editing items
  onSubmit(): void {
    if (this.itemForm.valid) {
      const formData = this.itemForm.value as ClothingItem;

      if (this.isEditMode && this.currentItemId) {
        formData.id = this.currentItemId;
        const existingItem = this.wardrobeService.getItemById(this.currentItemId);
        formData.createdAt = existingItem ? existingItem.createdAt : new Date();
        this.wardrobeService.updateItem(formData);
      } else {
        this.wardrobeService.addItem(formData);
      }

      this.router.navigate(['/clothes']);
    } else {
      // Mark all fields as touched to trigger validation messages
      this.itemForm.markAllAsTouched();
    }
  }

  onDelete(): void {
    if (this.currentItemId) {
      // Confirm deletion with the user
      const confirmDelete = confirm('Are you sure you want to delete this item?');
      if (confirmDelete) {
        this.wardrobeService.deleteItem(this.currentItemId);
        // After deletion, navigate back to the list
        this.router.navigate(['/clothes']);
      }
    }
  }
}
