import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesApi } from '../../core/services/services-api';
import { IService } from '../../core/models/api.models';
import { Seo } from '../../core/services/seo';

@Component({
  selector: 'app-services-page',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements OnInit {
  private readonly api = inject(ServicesApi);
  private readonly seo = inject(Seo);

  private readonly rawServices = signal<IService[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  /** Servicios únicos: la API puede devolver duplicados con el mismo nombre. */
  protected readonly services = computed(() => {
    const seen = new Set<string>();
    return this.rawServices().filter((s) => {
      const key = (s.name ?? '').trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  });

  ngOnInit(): void {
    this.seo.update({
      title: 'IWS+ | Services',
      description:
        'Web development, web design, SEO, digital marketing and more. Tailored solutions to grow your business online.',
      path: '/services',
    });
    this.api.getServices().subscribe({
      next: (list) => {
        this.rawServices.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  protected iconIndex(service: IService): number {
    return (service.id ?? 0) % 6;
  }
}
