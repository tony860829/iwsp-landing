import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

interface Solution {
  icon: string;
  title: string;
  text: string;
  accent?: boolean;
}

@Component({
  selector: 'app-solutions',
  imports: [TranslocoPipe],
  templateUrl: './solutions.html',
  styleUrl: './solutions.scss',
})
export class Solutions {
  protected readonly solutions: Solution[] = [
    {
      icon: 'M4 5h16v11H4z M2 18h20',
      title: 'home.solutions.webdevTitle',
      text: 'home.solutions.webdevText',
    },
    {
      icon: 'M12 3l9 5-9 5-9-5z M3 13l9 5 9-5',
      title: 'home.solutions.webdesignTitle',
      text: 'home.solutions.webdesignText',
      accent: true,
    },
    {
      icon: 'M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M20 20l-5-5',
      title: 'home.solutions.seoTitle',
      text: 'home.solutions.seoText',
    },
    {
      icon: 'M3 11l14-5v12L3 13z M17 6v12',
      title: 'home.solutions.marketingTitle',
      text: 'home.solutions.marketingText',
    },
    {
      icon: 'M4 6h16v12H4z M4 7l8 6 8-6',
      title: 'home.solutions.emailTitle',
      text: 'home.solutions.emailText',
      accent: true,
    },
    {
      icon: 'M8 3H4v4h4z M20 3h-4v4h4z M8 17H4v4h4z M20 17h-4v4h4z',
      title: 'home.solutions.socialTitle',
      text: 'home.solutions.socialText',
    },
  ];
}
