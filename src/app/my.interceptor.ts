import { HttpInterceptorFn } from '@angular/common/http';

export const myInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('HTTP Interceptor is triggered...');
  const newRequest = req.clone({
    setHeaders: {
      "Authorization":"test"
    }
  })
  console.log('The request has manipulated and ready to send.')
  return next(newRequest);

};
 