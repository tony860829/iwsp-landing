import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { combineLatest } from 'rxjs';
import { ServicesApi } from '../../core/services/services-api';
import { IService } from '../../core/models/api.models';
import { Seo } from '../../core/services/seo';

@Component({
  selector: 'app-services-page',
  imports: [RouterLink, CurrencyPipe, TranslocoPipe],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements OnInit {
  private readonly api = inject(ServicesApi);

  protected readonly services = signal<IService[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  constructor() {
    const seo = inject(Seo);
    const transloco = inject(TranslocoService);
    combineLatest([
      transloco.selectTranslate('seo.services.title'),
      transloco.selectTranslate('seo.services.description'),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([title, description]) => seo.update({ title, description, path: '/services' }));
  }

  ngOnInit(): void {
    this.api.getUniqueServices().subscribe({
      next: (list) => {
        this.services.set(list);
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
