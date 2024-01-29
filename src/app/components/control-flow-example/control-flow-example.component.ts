import { Component } from '@angular/core';

@Component({
  selector: 'app-control-flow-example',
  standalone: true,
  imports: [],
  template:`
    <h3>Control Flow Sintax - if</h3>
    @if(!condition; as result){
        <p>condition is {{result}}</p>
    }@else {
      <p>condition is false</p>
    }
    <hr>
    <h3>Control Flow Sintax - for</h3>
    <ul>
      @for (item of ['a','b','c'];track item) {
        <li>{{item}}</li>
      }
      @empty {
        <li>The provided list is empty.</li>
      }
    </ul>
  `
})
export class ControlFlowExampleComponent {
  condition = false;
}
