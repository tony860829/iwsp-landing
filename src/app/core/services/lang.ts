import { DOCUMENT, isPlatformBrowser, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type AppLang = 'en' | 'es';

export const AVAILABLE_LANGS: AppLang[] = ['en', 'es'];
const STORAGE_KEY = 'iws-lang';

registerLocaleData(localeEs);

@Injectable({ providedIn: 'root' })
export class Lang {
  private readonly transloco = inject(TranslocoService);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly activeLang = signal<AppLang>(this.resolveInitialLang());

  constructor() {
    this.apply(this.activeLang());
  }

  setLang(lang: AppLang): void {
    if (lang === this.activeLang()) return;
    this.activeLang.set(lang);
    this.apply(lang);
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  private apply(lang: AppLang): void {
    this.transloco.setActiveLang(lang);
    this.document.documentElement.lang = lang;
  }

  private resolveInitialLang(): AppLang {
    if (this.isBrowser) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'es') return stored;
      const browser = navigator.language?.slice(0, 2).toLowerCase();
      if (browser === 'es') return 'es';
    }
    return 'en';
  }
}
