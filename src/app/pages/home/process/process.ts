import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-process',
  imports: [TranslocoPipe],
  templateUrl: './process.html',
  styleUrl: './process.scss',
})
export class Process {
  protected readonly steps = [
    { title: 'home.process.step1Title', text: 'home.process.step1Text' },
    { title: 'home.process.step2Title', text: 'home.process.step2Text' },
    { title: 'home.process.step3Title', text: 'home.process.step3Text' },
    { title: 'home.process.step4Title', text: 'home.process.step4Text' },
  ];
}
