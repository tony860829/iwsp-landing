import { Component } from '@angular/core';

interface Crew {
  image: string;
  initials: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team {
  // Imágenes AI en /public/images/
  protected readonly crews: Crew[] = [
    {
      image: 'images/design.webp',
      initials: 'D',
      title: 'Designers',
      text: 'Visual design and user experience that turn visitors into clients.',
    },
    {
      image: 'images/development.webp',
      initials: 'DEV',
      title: 'Software Developers',
      text: 'Modern, fast and scalable code that brings every project to life.',
    },
    {
      image: 'images/marketing.webp',
      initials: 'MKT',
      title: 'Marketing Specialists',
      text: 'SEO, ads and content strategies that make your business grow.',
    },
  ];
}
