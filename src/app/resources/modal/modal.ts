import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ModalService } from '../../services/modal';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Modal {
  private modalService = inject(ModalService);

  state = computed(() => this.modalService.modalState());

  close(): void {
    this.modalService.close();
  }

  confirm(): void {
    this.modalService.confirmAction();
  }

  cancel(): void {
    this.modalService.cancelAction();
  }
}
