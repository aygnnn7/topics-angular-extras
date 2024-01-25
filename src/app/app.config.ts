import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { myInterceptor } from './my.interceptor';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { CustomErrorHanlder } from './custom.error.handler';
import { customHttpInterceptor } from './custom-http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([myInterceptor])),
    importProvidersFrom(HttpClientModule),
    {
      provide: APP_INITIALIZER,
      useFactory: (httpClient: HttpClient) => {
        httpClient.get("./assets/config/appConfig.json").subscribe(configs => console.log(configs))
        console.log("Priority configurations have taken place.")
        return null;
      }, deps: [HttpClient]
    }, provideClientHydration(),
    { provide: ErrorHandler, useClass: CustomErrorHanlder },
    provideHttpClient(withInterceptors([customHttpInterceptor]))
  ]
};
