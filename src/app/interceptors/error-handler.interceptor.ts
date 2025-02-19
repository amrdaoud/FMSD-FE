import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        console.warn('500 Internal Server Error occurred. Skipping and continuing.');
        // Return an empty response so that execution continues without failure
        return of({} as HttpEvent<any>);
      }
      return of(error.error || {} as HttpEvent<any>); // Continue execution for other errors
    })

    // ,tap(event => {
    //   console.log('API Request:', req.url, 'Method:', req.method);
    //   console.log('API Response:', event);
    // })
  );


};
