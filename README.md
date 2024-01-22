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

### Adding Bootstrap to an Angular Application:
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