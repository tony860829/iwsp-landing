import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-audience',
  imports: [TranslocoPipe],
  templateUrl: './audience.html',
  styleUrl: './audience.scss',
})
export class Audience {
  protected readonly audiences = [
    { title: 'home.audience.startupsTitle', text: 'home.audience.startupsText' },
    { title: 'home.audience.smallTitle', text: 'home.audience.smallText' },
    { title: 'home.audience.prosTitle', text: 'home.audience.prosText' },
    { title: 'home.audience.storesTitle', text: 'home.audience.storesText' },
  ];
}
