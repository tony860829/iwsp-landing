import { Component } from '@angular/core';

@Component({
  selector: 'app-audience',
  templateUrl: './audience.html',
  styleUrl: './audience.scss',
})
export class Audience {
  protected readonly audiences = [
    {
      title: 'Startups',
      text: 'Validate your idea with a professional online presence from day one.',
    },
    {
      title: 'Small Businesses',
      text: 'Convert more of your visitors into real clients with a site that sells.',
    },
    {
      title: 'Professionals',
      text: 'Showcase your portfolio and services with a website that builds trust.',
    },
    {
      title: 'Online Stores',
      text: 'Sell your products 24/7 with an optimized e-commerce experience.',
    },
  ];
}
