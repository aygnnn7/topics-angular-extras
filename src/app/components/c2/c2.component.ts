import { Component } from '@angular/core';

@Component({
  selector: 'app-c2',
  standalone: true,
  imports: [],
  template:`
  Comp 2
  <br>
  <p>Comp 2 p element - styled via 'ViewEncapsulation.None' in Component 1</p>
  <p [style.color]="color"> Comp 2 p element - styled with style binding </p>
  <p [style.color]="getColor()"> Comp 2 p element - styled with style binding by condition </p>
  `
})
export class C2Component {
  color:string = "red";
  getColor(): string {
    return "green";
  };
}
