import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { myInterceptor } from './my.interceptor';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

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
    }
  ]
};
