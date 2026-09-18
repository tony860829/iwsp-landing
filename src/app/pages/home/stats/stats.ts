import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class Stats {
  protected readonly stats = [
    { value: '100%', label: 'Client Satisfaction' },
    { value: '6+', label: 'Active Projects' },
    { value: '5', label: 'Team Experts' },
    { value: '24/7', label: 'Support Availability' },
  ];
}
