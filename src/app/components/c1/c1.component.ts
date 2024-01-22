import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-c1',
  standalone: true,
  imports: [],
  template:`
  Comp 1
  <br>
  <p>Comp 1 p element</p>
  `,
  styles:["p{color:blue}"],
  encapsulation: ViewEncapsulation.None
})
export class C1Component {

}
