import { Injectable, signal } from '@angular/core';

export type ModalVariant = 'info' | 'success' | 'error';

export interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  variant: ModalVariant;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private state = signal<ModalState>({
    isOpen: false,
    title: '',
    message: '',
    variant: 'info'
  });

  readonly modalState = this.state.asReadonly();

  open(message: string, options?: { title?: string; variant?: ModalVariant }): void {
    this.state.set({
      isOpen: true,
      title: options?.title ?? 'Aviso',
      message,
      variant: options?.variant ?? 'info'
    });
  }

  close(): void {
    this.state.update((current) => ({ ...current, isOpen: false }));
  }
}
