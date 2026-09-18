import { Component } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.html',
  styleUrl: './process.scss',
})
export class Process {
  protected readonly steps = [
    {
      title: 'Discovery',
      text: 'We analyze your business, goals and competitors to define the strategy.',
    },
    {
      title: 'Design',
      text: 'We create the visual proposal aligned with your brand and your clients.',
    },
    {
      title: 'Development',
      text: 'We build your website with modern, fast and scalable technology.',
    },
    {
      title: 'Launch & Grow',
      text: 'We publish, measure results and optimize continuously.',
    },
  ];
}
