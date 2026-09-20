import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { catchError, throwError } from 'rxjs';
import { Toast } from '../services/toast';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(Toast);
  const transloco = inject(TranslocoService);
  return next(req).pipe(
    catchError((err: unknown) => {
      const apiMessage =
        err instanceof HttpErrorResponse &&
        typeof err.error === 'object' &&
        err.error !== null &&
        'message' in err.error
          ? String((err.error as { message: unknown }).message)
          : '';
      toast.error(apiMessage || transloco.translate('errors.generic'));
      return throwError(() => err);
    })
  );
};
