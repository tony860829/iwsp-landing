import { Component } from '@angular/core';

interface Solution {
  icon: string;
  title: string;
  text: string;
  accent?: boolean;
}

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.html',
  styleUrl: './solutions.scss',
})
export class Solutions {
  protected readonly solutions: Solution[] = [
    {
      icon: 'M4 5h16v11H4z M2 18h20',
      title: 'Web Development',
      text: 'Develop a full web solution for your business: fast, secure and ready to scale.',
    },
    {
      icon: 'M12 3l9 5-9 5-9-5z M3 13l9 5 9-5',
      title: 'Web Design',
      text: 'Customized designs focused on user experience and your brand identity.',
      accent: true,
    },
    {
      icon: 'M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M20 20l-5-5',
      title: 'SEO / Search Engine',
      text: 'Optimize your site to rank better in search engines and attract organic traffic.',
    },
    {
      icon: 'M3 11l14-5v12L3 13z M17 6v12',
      title: 'Digital Marketing',
      text: 'Campaigns on social networks and ads to reach your ideal customers.',
    },
    {
      icon: 'M4 6h16v12H4z M4 7l8 6 8-6',
      title: 'Email Marketing',
      text: 'Design and automation of email campaigns to retain your customers.',
      accent: true,
    },
    {
      icon: 'M8 3H4v4h4z M20 3h-4v4h4z M8 17H4v4h4z M20 17h-4v4h4z',
      title: 'Social Media Admin',
      text: 'Management of your social media so you can focus on your business.',
    },
  ];
}
