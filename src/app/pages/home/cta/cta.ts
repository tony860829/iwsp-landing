import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-cta',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './cta.html',
  styleUrl: './cta.scss',
})
export class Cta {}
