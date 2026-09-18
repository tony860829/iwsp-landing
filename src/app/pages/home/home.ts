import { Component, OnInit, inject } from '@angular/core';
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
export class Home implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.update({
      title: 'IWS+ | Start Getting Clients for your Business',
      description:
        'We help businesses grow online with tailored web development, SEO and digital marketing solutions.',
      path: '/',
    });
  }
}
