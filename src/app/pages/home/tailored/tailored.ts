import { Component } from '@angular/core';

@Component({
  selector: 'app-tailored',
  templateUrl: './tailored.html',
  styleUrl: './tailored.scss',
})
export class Tailored {
  protected readonly prestigeServices = [
    'Web Dev',
    'Our team services',
    'Optimization',
    'Marketing',
    'E-mail service',
  ];
}
