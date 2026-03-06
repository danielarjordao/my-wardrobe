import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css'
})
export class KpiCard {
  // These @Input() properties allow the parent component to pass in the title, value, and icon class for each KPI card.
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number | null;
  @Input({ required: true }) iconClass!: string;
}
