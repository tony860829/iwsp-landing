import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

interface Crew {
  image: string;
  initials: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-team',
  imports: [TranslocoPipe],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team {
  // AI images in /public/images/
  protected readonly crews: Crew[] = [
    {
      image: 'images/design.webp',
      initials: 'D',
      title: 'home.team.designTitle',
      text: 'home.team.designText',
    },
    {
      image: 'images/development.webp',
      initials: 'DEV',
      title: 'home.team.devTitle',
      text: 'home.team.devText',
    },
    {
      image: 'images/marketing.webp',
      initials: 'MKT',
      title: 'home.team.mktTitle',
      text: 'home.team.mktText',
    },
  ];
}
