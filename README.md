# Angular - My Notes 5

# Extra details about Angular architecture

## Styling & View Encapsulation

### Global CSS/SCSS Styles

In Angular, defining a global CSS file can be done either through `angular.json` or `index.html`. The best practice is to define it in `angular.json`. This approach ensures that the global styles are centrally managed and consistently applied across the entire application.

### View Encapsulation

View Encapsulation in Angular controls how styles defined in a component's template affect the rest of the application. It's important to manage how CSS rules defined in one component affect or override the styles in other components. In summary, View Encapsulation refers to strategies that determine the scope and impact of styles defined in any component of the application. There are three strategies:

- `ViewEncapsulation.None`: Used when no encapsulation is desired. CSS rules defined in one component will affect other components loaded on the page.
- `ViewEncapsulation.Emulated`: This strategy applies a marking method to encapsulate the CSS rules within a component.
- `ViewEncapsulation.ShadowDOM`: In this strategy, the browser creates a separate Shadow DOM for the application. This Shadow DOM keeps all its properties, state, and CSS rules hidden.

### Dynamically Styling Elements

With Style Binding, elements can be dynamically or programmatically styled.

```html
<p [style.color]="color">Some text</p>
<!-- style binding with conditions -->
<p [style.color]="getColor()"> Some another text</p>
```

```javascript
color: string = "red";
getColor(): string {
    return "green";
};
```

Note: Similarly, Class Binding can be done using `ClassName` with the same logic.

### Adding Bootstrap to an Angular Application

- First, install the Bootstrap library:
`npm i bootstrap`
- Then, access the physical files of the library in the `node_modules` directory.
- Finally, reference the CSS and JS files from the library in the `angular.json` file appropriately. This ensures that Bootstrap styles and scripts are properly loaded and available for use in the Angular application.

## What is APP_INITIALIZER?

`APP_INITIALIZER` is a built-in injection token provided by Angular. This token allows developers to execute certain code before the application starts running. These codes can include actions like authentication, environment configuration, preloading data via APIs, and more. Angular will delay the start of the application until all functions provided by `APP_INITIALIZER` are executed and completed.

For example:

```javascript
bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        // Configurations or initializations here
        console.log("Priority configurations have taken place.")
        return null;
      }
    }
  ]
})
```

In this example, a factory function is provided to `APP_INITIALIZER`, which logs a message. The application's startup process will wait until this function completes. This mechanism is particularly useful for initializing global settings, fetching configuration settings, or performing necessary checks before the application fully loads, ensuring that the application starts with all the required initial setups.

## Angular Runtime Configuration

Many applications require runtime configuration information to be loaded at startup. For instance, the endpoints used by an application for data needs may differ in test, pre-prod, and prod environments. In Angular, `environment variables` exist to hold configuration data. However, since `environment variables` are defined at compile-time, they cannot be changed at runtime. Therefore, for runtime-configurable settings, we could use a database. But as this also requires storing necessary endpoints, the best practice is to keep configurations in files that can be deployed along with the application. For example, a configuration file can be stored in the `src/app/assets/config` directory and created in JSON or XML format.

Example `appConfig.json` file:

```json
{
   "a": "b",
   "x": "y"
}
```

To read certain configuration information before the application's first page loads, we can utilize the `APP_INITIALIZER` token.
Example of using `APP_INITIALIZER` for reading configurations:

```javascript
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    {
        provide: APP_INITIALIZER,
        useFactory: (httpClient: HttpClient) => {
            return () => httpClient.get("./assets/config/appConfig.json").toPromise().then(configs => console.log(configs));
        },
        deps: [HttpClient],
        multi: true
    }
  ]
})
```

## Environment Variables

Most applications go through stages like `development`, `test`, `pre-prod`, and `production` before going live. Each of these stages is an `environment`, and each environment might require different setup configurations and structures.

`Environment variables` are variables whose values change based on the web application's environment. These variables allow for modifications or management of some behaviors of the application according to its environment. Usually, endpoints in `development`, `test`, and `production` environments are different, and their management can be done through `environment` files.

### Creating Environments

You can create the necessary basic environment files by running `ng g environments`. This console command will also make the required updates in `angular.json`.

### Creating Environment Variables

Example of defining a variable in `environment.ts`:

```javascript
export const environment = {
    production: true,
    apiEndPoint: 'https://example.com'
};
```

Example of defining a variable in `environment.development.ts`:

```javascript
export const environment = {
    production: false,
    apiEndPoint: 'https://dev.example.com'
};
```

### Reading Environment Variables

To read environment variables, simply import the `environment.ts` file.

To test, you can change the application's environment while launching it with `ng serve --configuration='production'`.

## Communication with External Services using HttpClient Library

In Angular architecture, data operations are typically managed through communication processes with APIs. For this, we need to send HTTP requests to APIs, which is generally accomplished using Angular's built-in `HttpClient` library. `HttpClient` is a ready-made library that facilitates sending `GET`, `POST`, `PUT`, and `DELETE` requests to APIs and receiving responses.

### Using the HttpClient Library

To use the HttpClient library, we first need to add the HttpClient service to the IoC (Inversion of Control) provider. This can be done in the `main.ts` file by adding `HttpClientModule` through the `bootstrapApplication` function:

```javascript
bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(HttpClientModule)
    ]
})
```

Once this module is provided, the HttpClient service can be injected at any required point in the application. Here's an example of using a `GET` request:

```javascript
constructor(private httpClient: HttpClient) {
    httpClient.get("https://jsonplaceholder.typicode.com/posts")
      .subscribe({
        next: datas => console.log(datas),
        error: error => console.log(error)
      });
}
```

Here, we use the `get` method of the library injected via the `constructor`. If the request is successful and we receive a response, it can be processed with `next`; if an error occurs, it can be accessed with `error`.

Adding parameters to a request with HttpParams:

```javascript
var params = new HttpParams()
      .set("id", "1");

httpClient.get("https://jsonplaceholder.typicode.com/posts", {params})
    .subscribe({
        next: datas => console.log(datas),
        error: error => console.log(error)
    });
```

This can also be done using the `fromString` and `fromObject` features of HttpParams. Example of using `fromObject`:

```javascript
let params = new HttpParams({
    fromObject: {
        id: 1,
        sort: "asc"
    }
})
```

### HttpHeaders

In the communication process over HTTP protocol, the client and server can share additional information via HTTP Headers. Typically, in accessing endpoints that require authorization, the token representing authorization is sent to the server in these headers.

Example:

```javascript
const headers = new HttpHeaders()
    .set("name", "Jack")
    .set("country", "Bulgaria");
httpClient.get("https://jsonplaceholder.typicode.com/posts", {headers})
    .subscribe({
        next: datas => console.log(datas),
        error: error => console.log(error)
    });
```

This example demonstrates how headers can be used to pass additional data such as authorization tokens or other necessary information for the request.

## What is an Http Interceptor?

An HTTP Interceptor in Angular is a mechanism that allows for central processing of HTTP requests made throughout the application. With this mechanism, HTTP requests made at the application level can be intercepted to manipulate the upcoming request. It also provides the opportunity to centrally modify the response that will be received as a result of these requests.

### Usage of Http Interceptor

There are several reasons why an HTTP Interceptor is needed, but the most important is for appending an Access Token to the headers of requests made to APIs requiring authentication. This way, we avoid the burden of adding an Access Token to each request.

Other usage scenarios include:

- Error handling: Interceptors can be used to process errors from the server or to add specific error messages to requests.
- Caching processes: Interceptors can be used to cache certain requests to prevent repetition.
- Logging: Interceptors can log and trace requests and responses.

### Creating an Http Interceptor

We can easily create an interceptor with the command `ng g interceptor [name]`.

Example usage:

```javascript
export const myInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('HTTP Interceptor is triggered...');
  const newRequest = req.clone({
    setHeaders:{
      "Authorization": "example"
    },
    body: {
      a: 'b'
    }
  });
  console.log('The request has been manipulated and is ready to send.')
  return next.handle(newRequest);
};
```

To make this `myInterceptor` usable throughout the application, we simply need to provide it in `app.config.ts`.

```javascript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withInterceptors([myInterceptor]))
  ]
};
```

Now, any request made at any point in the application will first be intercepted by this interceptor, and the predefined operations will be executed. This makes the interceptor a powerful tool for maintaining consistency and efficiency in handling HTTP requests and responses across the application.

## Server-Side Rendering with Angular Universal

Angular Universal is a feature of the Angular Framework that enables server-side execution of JavaScript-based web applications. With Angular Universal, content is generated on the server side for the initially loaded page and sent to the browser. This results in faster loading times and, crucially, makes the application more search engine friendly. Angular Universal also addresses one of the major SEO shortcomings of Single Page Applications (SPAs) by generating content in a way that search engines can read for each page navigation.

Implementing SSR with Angular Universal is a healthier choice in terms of the value of the application in the eyes of search engines.

### What is Server-Side Rendering (SSR)?

Many modern web applications today run on the client-side, with the page content being generated by JavaScript. This means that when users open the application in their browser, the relevant JavaScript files must be downloaded, parsed, and executed. This process can inevitably extend the page loading time and also hinder search engines from accessing the page content for SEO purposes.

SSR is used to speed up this process and to present the application to users more quickly, while also making the content accessible to search engines.

### How is it implemented?

By running `ng add @angular/ssr`, we include Angular Universal and the SSR behavior in our application.

This addition transforms the Angular application into a platform where server-side rendering is enabled, significantly improving the initial loading performance and enhancing the app's visibility and indexability by search engines. This approach is particularly beneficial for applications that require robust SEO capabilities.

## Signals

**Signals** in Angular 16 are a new feature introduced to track changes in variable values and reactively notify when a change occurs. Unlike traditional variables, signals exhibit a reactive behavior, allowing them to respond to changes in their values.

```javascript
let x = 5;
let y = 15;
let z = x + y;
console.log(z); // 20
x = 10;
console.log(z); // 20
```

In the above code, the value of `z` is calculated based on the initial values of `x` and `y`. However, changing the value of `x` later does not affect the already calculated value of `z`. If we want a variable to reactively respond to changes in `x` or `y`, we can use the following approach:

```javascript
get total() {
  return this.x + this.y;
}
```

This way, every time we call the `total` function, it dynamically calculates the sum of `x` and `y`. Alternatively, without adding an extra property or function, we can utilize **Signals** as follows:

```javascript
let x = signal(5);
let y = 15;
let z = computed(() => x() + y);
console.log(z()); // 20
x.set(10);
console.log(z()); // 25
```

Here's the breakdown:

- The `signal` function is used to track changes in the variable `x`.
- The `computed` function recalculates the value of `z` whenever `x` changes.

Signals provide excellent control over data changes, improve application performance, and offer an effective user experience in terms of change detection.

### Signal - Zone.js Relationship

While Zone.js manages asynchronous operations in Angular, providing an effective way to work with events and improve performance, **Signals** operate independently of Zone.js. This independence allows them to work more efficiently and performantly.

### Signal Definition and Usage

To define a signal, we use the `signal` function from `@angular/core`. Here's a simple example:

```javascript
import { signal } from '@angular/core';
let x = signal(5);
```

### Signal Functions

The `signal` function creates a writable and readable signal by default (`WritableSignal<type>`). To use the value of the signal, you simply call it like `x()`.

The `set` function allows us to change the existing value of the signal. Note that if multiple consecutive `set` operations are performed, Angular will only update the template for the final result, optimizing performance.

The `update` function performs operations on the current value. For example:

```javascript
this.x.update(data => data + 1);
```

The `computed` function creates a function that depends on one or more signals, and it reacts to changes in those signals. It dynamically handles dependencies, making it flexible for dynamic behavior.

### `effect` Function

The `effect` function is used to execute code when the value of a signal changes. It is typically used in the constructor and can be helpful for various scenarios such as logging, synchronization, or adding custom DOM behaviors.

To prevent an effect from triggering when a signal changes, we can use the `untracked` function. For example:

```javascript
effect(() => {
  console.log(`x current value: ${this.x()}`);
  untracked(() => {
    this.y.update(data => data - 1);
    console.log(`y current value: ${this.y()}`);
  });
});
```

### RxJS Interop

Angular introduces interoperability between observables and signals using `toSignal` and `toObservable` functions. It's important to use these functions at the constructor level to avoid errors. Additionally, when using `toSignal`, you may want to provide an initial value using the `initialValue` property.

## Error Handling in Angular

Error handling is a crucial aspect of software applications, and Angular provides mechanisms to handle errors effectively, especially in scenarios like HTTP request processes where server-side errors are common. The default error handling behavior in Angular is provided by the `ErrorHandler` class from `@angular/core`. However, you can customize error handling by creating your own error handler.

### Custom Error Handler

To create a custom error handler, you can implement the `ErrorHandler` interface. Here's an example:

```javascript
import { ErrorHandler } from '@angular/core';

export class CustomErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.log(error, "error");
  }
}
```

To make Angular use your custom error handler, you need to define it in the `app.config.ts`:

```javascript
{
  provide: ErrorHandler,
  useClass: CustomErrorHandler
}
```

### HTTP Interceptor Error Handling

When it comes to handling HTTP errors through an interceptor, you can use the `catchError` operator from RxJS to catch errors and take appropriate actions. Here's an example:

```javascript
export const customHttpInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
            console.log("401 status code");
            break;
          case 402:
            console.log("402 status code");
            break;
          case 403:
            console.log("403 status code");
            break;
          case 404:
            console.log("404 status code");
            break;
          default:
            console.log(`Unhandled status code: ${error.status}`);
            break;
        }
      }
      return throwError(() => ({ message: error.message }));
    })
  );
};
```

In this example, the `catchError` operator is used to handle HTTP errors. It checks the status code of the error and takes specific actions based on different status codes. The `throwError` function is used to return an observable that emits an error with a custom message.

## Angular Storages

In every web architecture, as with API or other external services, we meet our need to store some data on the client side using storages.

### Local Storage

It is a storage that provides permanent storage in the browser. In other words, the data will remain persistent even if the browser is closed. It stores data in key/value format.

```javascript
//inserting data
localStorage.setItem("name", "john");
//retrieving data
const name = localStorage.getItem("name");
//deleting data
localStorage.removeItem("name");
```

### Session Storage

Provides a storage area valid for the duration of a browser tab. As soon as the browser tab or browser is closed, all the information will be deleted. It stores data in key/value format.

```javascript
//inserting data
sessionStorage.setItem("name", "john");
//retrieving data
const name = sessionStorage.getItem("name");
//deleting data
sessionStorage.removeItem("name");
```

### Cache Storage

Commonly used for temporarily storing data in memory or storage space. Especially in scenarios such as offline operations or performance improvements, Cache storage can be a preferable choice.

```javascript
caches.open("user-cache").then(cache => {
  cache.put("permissions", new Response("['select', 'update']"))
  
  cache.match("permissions").then(data => {
    data.text().then(_data => console.log(_data))
  })
})
```

### Cookie

In Angular, cookies require the installation of the `ngx-cookie-service` library into the application.
Then, we need to provide `CookieService` to the relevant component.
Afterward, you can use it wherever you want through the `set` and `get` functions.

## Angular - jQuery

Although it's not considered a best practice, jQuery can be used in Angular applications.
Steps to use it:

1) Install with the command `npm i jquery`.
2) Then copy the path from the node_modules folder and write it into the angular.json file under scripts.

```javascript
scripts:{
    "node_modules/jquery/dist/jquery.min.js"
}
```

3) To use jQuery within TypeScript, declare it at the top of the code page (right below the Import declarations) like this:

```javascript
import {Component} from '@angular/core';

declare var $: any;
//...
```

Angular is an architecture that provides DOM manipulation and event management. Therefore, where necessary, you should prioritize using Angular's own methods for the consistency and performance of the applications.
Furthermore, Angular's features will help you better organize the logic of your application and maintain it more easily.
Thus, yes, you can use jQuery if needed, but this should not be arbitrary. As mentioned earlier, Angular's features should be the primary choice.

## Control Flow Syntax

With Angular 17, the Control Flow Syntax feature has been introduced, allowing us to use more programmatic structures like if/else, for, and switch, instead of built-in directives such as `*ngIf`, `*ngFor`, and `*ngSwitch`.
This feature allows us to implement what was previously done with directives using programmatic blocks.
For example, the old and still usable method:

```html
<div *ngIf="condition">
  <ul>
    <li *ngFor="let number of numbers">{{number}}</li>
  </ul>
</div>
```

The new Control Flow Syntax:

```html
@if(condition){
  <div>
    <ul>
      @for(number of numbers; track $index){
        <li>{{number}}</li>
      }
    </ul>
  </div>
}
```

With the built-in directives, we convert the template to `ng-template` and then manage them dynamically with `ViewContainer` without realizing it in the background.
This behavior will have disadvantages such as cost from the compiler's perspective.
To address this, the Angular team has developed the more efficient Control Flow Syntax, which does the same job without additional compiler load and creates the same view.

In the case where the source of the loop in a for loop is empty, we can use `@empty` to execute the code we specify for this situation.
For example:

```html
<ul>
  @for (item of ['a','b','c'];track item) {
    <li>{{item}}</li>
  }
  @empty {
    <li>The provided list is empty.</li>
  }
</ul>
```

To convert old directive structures to the new syntax, we can issue the following command in the CLI:
`ng g @angular/core:control-flow`

## What is `@defer`?

`@defer` is a new feature introduced with Angular 17 as an alternative to the component lazy loading behavior. Functionally, in contrast to the existing lazy loading behavior that is dependent on the router mechanism, it allows us to implement lazy loading behavior in components used over selectors.
Example Usage of `@defer`:

```html
@defer(when state){
  <app-home></app-home>
}
```

In this example, the parenthesis contains a condition based on which the component referenced by the selector is loaded lazily.

### @placeholder | @loading | @error

If we want a different view until the loading condition of `@defer` is met, we can use `@placeholder`. Then, while the component is loading, we can use `@loading`, and if we encounter an error during the loading process, we can take necessary measures in the `@error` block.

```html
@defer(when state){
  <app-home></app-home>
}
@placeholder {
  .....
}
@loading{
  Loading...
}
@error{
  Error
}
```

### Counteracting Flickering with `after` & `minimum` Usage

In some cases, the loading of the `@defer` block can be very fast due to the lightness of the content, causing the `@loading` block to appear and disappear quickly, leading to a flickering effect. To prevent this, we can configure when the loading will be displayed and the minimum loading option with the `after` and `minimum` options.
`after`

```html
@loading(after 150ms){
  Loading...
}
```

`minimum`

```html
@loading(minimum 150ms){
  Loading...
}
```

### Conditions for @defer

- on idle
- when
- on immediate
- on timer
- on hover
- on interaction
- on viewport

### Prefetching

With the prefetch feature of `@defer`, we can pre-emptively handle the loading cost of a component but then load it lazily later.
