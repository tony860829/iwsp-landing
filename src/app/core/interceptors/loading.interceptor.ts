import { isPlatformServer } from '@angular/common';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { tap } from 'rxjs';
import { Loading } from '../services/loading';

/**
 * Global loading spinner. Skipped on the server (no UI) and for
 * internal asset requests (i18n JSONs), which Transloco triggers
 * during template rendering (writing a signal there throws NG0600).
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const isServer = isPlatformServer(inject(PLATFORM_ID));
  if (isServer || req.url.includes('/i18n/')) {
    return next(req);
  }

  const loading = inject(Loading);
  // Defer the signal writes out of the current change-detection/render cycle
  // to avoid NG0600 when a request starts synchronously during rendering.
  queueMicrotask(() => loading.start());

  return next(req).pipe(
    tap({
      // finalize() in zoneless may run inside a signal/effect context; tap + microtask is safe.
      next: (event) => {
        if (event instanceof HttpResponse) queueMicrotask(() => loading.stop());
      },
      error: () => queueMicrotask(() => loading.stop()),
    })
  );
};
