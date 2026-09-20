import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { combineLatest } from 'rxjs';
import { PackagesApi } from '../../core/services/packages-api';
import { IPackage } from '../../core/models/api.models';
import { Seo } from '../../core/services/seo';

@Component({
  selector: 'app-pricing-page',
  imports: [RouterLink, CurrencyPipe, TranslocoPipe],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
})
export class Pricing implements OnInit {
  private readonly api = inject(PackagesApi);

  protected readonly packages = signal<IPackage[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  protected readonly showMonthly = signal(true);

  constructor() {
    const seo = inject(Seo);
    const transloco = inject(TranslocoService);
    combineLatest([
      transloco.selectTranslate('seo.pricing.title'),
      transloco.selectTranslate('seo.pricing.description'),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([title, description]) => seo.update({ title, description, path: '/pricing' }));
  }

  ngOnInit(): void {
    this.api.getPackages().subscribe({
      next: (list) => {
        this.packages.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  protected fullSave(pack: IPackage): number | null {
    if (!pack.monthlyPrice || !pack.fullPrice) return null;
    const save = pack.monthlyPrice * 4 - pack.fullPrice;
    return save > 0 ? save : null;
  }
}
