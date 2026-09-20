import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-stats',
  imports: [TranslocoPipe],
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class Stats {
  protected readonly stats = [
    { value: '100%', label: 'home.stats.clientSatisfaction' },
    { value: '6+', label: 'home.stats.activeProjects' },
    { value: '5', label: 'home.stats.teamExperts' },
    { value: '24/7', label: 'home.stats.support' },
  ];
}
