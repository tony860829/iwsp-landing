import { Component, inject, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ServicesApi } from '../../../core/services/services-api';
import { IService } from '../../../core/models/api.models';

@Component({
  selector: 'app-solutions',
  imports: [TranslocoPipe],
  templateUrl: './solutions.html',
  styleUrl: './solutions.scss',
})
export class Solutions {
  private readonly api = inject(ServicesApi);

  protected readonly services = signal<IService[]>([]);
  protected readonly loaded = signal(false);

  private readonly icons = [
    'M4 5h16v11H4z M2 18h20',
    'M12 3l9 5-9 5-9-5z M3 13l9 5 9-5',
    'M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M20 20l-5-5',
    'M3 11l14-5v12L3 13z M17 6v12',
    'M4 6h16v12H4z M4 7l8 6 8-6',
    'M8 3H4v4h4z M20 3h-4v4h4z M8 17H4v4h4z M20 17h-4v4h4z',
  ];

  constructor() {
    this.api.getUniqueServices().subscribe({
      next: (list) => {
        this.services.set(list);
        this.loaded.set(true);
      },
      error: () => this.loaded.set(true),
    });
  }

  protected iconPath(index: number): string {
    return this.icons[index % this.icons.length];
  }
}
