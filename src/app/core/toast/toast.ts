import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Toast } from '../services/toast';

@Component({
  selector: 'app-toast',
  imports: [TranslocoPipe],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class ToastContainer {
  protected readonly toast = inject(Toast);
}
