import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { ServicesApi } from '../services/services-api';
import { IService } from '../models/api.models';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly api = inject(ServicesApi);

  protected readonly year = new Date().getFullYear();

  protected readonly services = signal<IService[]>([]);

  constructor() {
    this.api.getUniqueServices().subscribe({
      next: (list) => this.services.set(list),
    });
  }
}
