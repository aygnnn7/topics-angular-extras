import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const customHttpInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      if(error instanceof HttpErrorResponse){
        switch(error.status){
          case 401: console.log("401 status code");
            break;
          case 402: console.log("402 status code");
          break;
          case 403: console.log("403 status code");
            break;
          case 404: console.log("404 status code");
          break;
        }
      }
      return throwError(()=> {error.message});
    })
  );
};