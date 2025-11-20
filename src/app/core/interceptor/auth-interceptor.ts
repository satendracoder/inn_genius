import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const route = inject(Router);
  const token: any = localStorage.getItem('userToken');

  const excludedUrls = ['/auth/login', '/auth/register', '/public/'];

  const shouldSkip =
    req.headers.has('No-Auth') || excludedUrls.some((url) => req.url.includes(url));

  if (shouldSkip) {
    const cleanReq = req.clone({ headers: req.headers.delete('No-Auth') });
    return next(cleanReq);
  }

  if (token?.token) {
    const authreq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    return next(authreq);
  }

  localStorage.removeItem('userToken');
  route.navigate(['/auth/login']);
  return next(req);
};
