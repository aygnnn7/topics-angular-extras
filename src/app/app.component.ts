import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { C1Component } from './components/c1/c1.component';
import { C2Component } from './components/c2/c2.component';
import { environment } from '../environments/environment';
import { HttpClientExampleComponent } from './components/http-client-example/http-client-example.component';
import { SignalsExampleComponent } from './components/signals-example/signals-example.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    C1Component,
    C2Component,
    HttpClientExampleComponent,
    SignalsExampleComponent
  ],
  template:`
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>


  <app-c1></app-c1>
  <hr>
  <app-c2></app-c2>
  <button (click)="btnClick()">Print environment</button>
  <hr>
  <app-http-client-example></app-http-client-example>
  <hr> 
  <app-signals-example></app-signals-example>
  `
})
export class AppComponent {
  btnClick(){
    console.log(environment);
  }
}
