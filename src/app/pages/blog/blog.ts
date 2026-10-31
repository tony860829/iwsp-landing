import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { combineLatest } from 'rxjs';
import { BlogApi } from '../../core/services/blog-api';
import { ICategory, IPost } from '../../core/models/api.models';
import { Seo } from '../../core/services/seo';
import { Lang } from '../../core/services/lang';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blog-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements OnInit {
  private readonly api = inject(BlogApi);
  private readonly lang = inject(Lang);

  private readonly rawPosts = signal<IPost[]>([]);
  private readonly categories = signal<ICategory[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  protected readonly posts = signal<IPost[]>([]);

  constructor() {
    const seo = inject(Seo);
    const transloco = inject(TranslocoService);
    combineLatest([
      transloco.selectTranslate('seo.blog.title'),
      transloco.selectTranslate('seo.blog.description'),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([title, description]) => seo.update({ title, description, path: '/blog' }));
  }

  ngOnInit(): void {
    this.api.getPosts().subscribe({
      next: (list) => {
        this.posts.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
    // Nombres de categoría para el badge de cada tarjeta (catálogo público)
    this.api.getCategories().subscribe({
      next: (categories) => this.categories.set(categories),
    });
  }

  protected categoryName(id?: number): string {
    return this.categories().find((c) => c.id === id)?.name ?? '';
  }

  protected imageSrc(picture?: string): string | null {
    return picture ? `${environment.apiUrl}Upload/getPhoto/${picture}` : null;
  }

  protected formatDate(date?: string): string {
    if (!date) return '';
    const locale = this.lang.activeLang() === 'es' ? 'es' : 'en';
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date));
  }

  protected excerpt(content?: string): string {
    const plain = (content ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return plain.length > 160 ? plain.slice(0, 160) + '…' : plain;
  }
}
