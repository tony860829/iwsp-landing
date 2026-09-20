import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-tailored',
  imports: [TranslocoPipe],
  templateUrl: './tailored.html',
  styleUrl: './tailored.scss',
})
export class Tailored {
  protected readonly prestigeServices = [
    'home.tailored.prestige1',
    'home.tailored.prestige2',
    'home.tailored.prestige3',
    'home.tailored.prestige4',
    'home.tailored.prestige5',
  ];
}
