import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, map, of, share, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IService } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class ServicesApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}Services`;

  private cache: IService[] | null = null;
  private inflight: Observable<IService[]> | null = null;

  getServices(): Observable<IService[]> {
    if (this.cache) return of(this.cache);
    this.inflight ??= this.http.get<IService[]>(this.url).pipe(
      tap((list) => (this.cache = list)),
      finalize(() => (this.inflight = null)),
      share(),
    );
    return this.inflight;
  }

  /** Unique services by name: the API may return duplicates. */
  getUniqueServices(): Observable<IService[]> {
    return this.getServices().pipe(map(dedupeServices));
  }
}

export function dedupeServices(list: IService[]): IService[] {
  const seen = new Set<string>();
  return list.filter((s) => {
    const key = (s.name ?? '').trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
