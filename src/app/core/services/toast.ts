import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error';

export interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

const DURATION_MS = 5000;

@Injectable({ providedIn: 'root' })
export class Toast {
  private nextId = 0;
  readonly toasts = signal<ToastItem[]>([]);

  success(message: string): void {
    this.show('success', message);
  }

  error(message: string): void {
    this.show('error', message);
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private show(type: ToastType, message: string): void {
    // Defer signal writes: callers (HTTP interceptors) may run inside a
    // template render / reactive context where writing signals throws NG0600.
    queueMicrotask(() => {
      const id = ++this.nextId;
      this.toasts.update((list) => [...list, { id, type, message }]);
      setTimeout(() => this.dismiss(id), DURATION_MS);
    });
  }
}
