import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-http-client-example',
  standalone: true,
  imports: [],
  template:`
  HTTP Client Example
  
  `
})
export class HttpClientExampleComponent {
  constructor(private httpClient:HttpClient){
    var params = new HttpParams()
      .set("id", "1");

    httpClient.get("https://jsonplaceholder.typicode.com/posts",{params} )
      .subscribe({
        next: datas => console.log(datas),
        error: error => console.log(error)
        
      });
  }
}
