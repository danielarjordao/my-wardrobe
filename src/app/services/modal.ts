import { Injectable, signal } from '@angular/core';

export type ModalVariant = 'info' | 'success' | 'error';
export type ModalType = 'alert' | 'confirm';

export interface ModalState {
  isOpen: boolean;
  type: ModalType;
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
    type: 'alert',
    title: '',
    message: '',
    variant: 'info'
  });

  private confirmResolver: ((value: boolean) => void) | null = null;

  readonly modalState = this.state.asReadonly();

  open(message: string, options?: { title?: string; variant?: ModalVariant }): void {
    this.state.set({
      isOpen: true,
      type: 'alert',
      title: options?.title ?? 'Aviso',
      message,
      variant: options?.variant ?? 'info'
    });
  }

  confirm(message: string, options?: { title?: string; variant?: ModalVariant }): Promise<boolean> {
    this.state.set({
      isOpen: true,
      type: 'confirm',
      title: options?.title ?? 'Confirm action',
      message,
      variant: options?.variant ?? 'info'
    });

    return new Promise<boolean>((resolve) => {
      this.confirmResolver = resolve;
    });
  }

  confirmAction(): void {
    if (this.confirmResolver) {
      this.confirmResolver(true);
      this.confirmResolver = null;
    }
    this.close();
  }

  cancelAction(): void {
    if (this.confirmResolver) {
      this.confirmResolver(false);
      this.confirmResolver = null;
    }
    this.close();
  }

  close(): void {
    this.state.update((current) => ({ ...current, isOpen: false, type: 'alert' }));
  }
}
