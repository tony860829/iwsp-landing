import { Component, inject, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { AppLang, AVAILABLE_LANGS, Lang } from '../services/lang';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, TranslocoPipe, UpperCasePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly lang = inject(Lang);
  protected readonly menuOpen = signal(false);
  protected readonly langs: AppLang[] = AVAILABLE_LANGS;
}
