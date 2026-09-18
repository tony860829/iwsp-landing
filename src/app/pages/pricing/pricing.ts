import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PackagesApi } from '../../core/services/packages-api';
import { IPackage } from '../../core/models/api.models';
import { Seo } from '../../core/services/seo';

@Component({
  selector: 'app-pricing-page',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
})
export class Pricing implements OnInit {
  private readonly api = inject(PackagesApi);
  private readonly seo = inject(Seo);

  protected readonly packages = signal<IPackage[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  protected readonly showMonthly = signal(true);

  ngOnInit(): void {
    this.seo.update({
      title: 'IWS+ | Pricing',
      description:
        'Flexible monthly and one-time plans for web development, marketing and design. Find the plan that fits your business.',
      path: '/pricing',
    });
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
