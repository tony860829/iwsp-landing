import { Injectable, signal } from '@angular/core';

/** Global HTTP loading state: counts in-flight requests (supports concurrency). */
@Injectable({ providedIn: 'root' })
export class Loading {
  private readonly pending = signal(0);
  readonly active = this.pending.asReadonly();

  start(): void {
    this.pending.update((n) => n + 1);
  }

  stop(): void {
    this.pending.update((n) => Math.max(0, n - 1));
  }
}
