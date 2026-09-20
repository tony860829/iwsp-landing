import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import { combineLatest } from 'rxjs';
import { Hero } from './hero/hero';
import { Stats } from './stats/stats';
import { Tailored } from './tailored/tailored';
import { Solutions } from './solutions/solutions';
import { Audience } from './audience/audience';
import { Process } from './process/process';
import { Team } from './team/team';
import { Cta } from './cta/cta';
import { Seo } from '../../core/services/seo';

@Component({
  selector: 'app-home',
  imports: [Hero, Stats, Tailored, Solutions, Audience, Process, Team, Cta],
  template: `
    <app-hero />
    <app-stats />
    <app-tailored />
    <app-solutions />
    <app-audience />
    <app-process />
    <app-team />
    <app-cta />
  `,
})
export class Home {
  constructor() {
    const seo = inject(Seo);
    const transloco = inject(TranslocoService);
    combineLatest([
      transloco.selectTranslate('seo.home.title'),
      transloco.selectTranslate('seo.home.description'),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([title, description]) => seo.update({ title, description, path: '/' }));
  }
}
