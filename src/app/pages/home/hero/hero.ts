import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
