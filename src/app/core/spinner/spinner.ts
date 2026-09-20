import { Component, inject } from '@angular/core';
import { Loading } from '../services/loading';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {
  protected readonly loading = inject(Loading);
}
