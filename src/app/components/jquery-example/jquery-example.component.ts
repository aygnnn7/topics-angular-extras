import { Component } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-jquery-example',
  standalone: true,
  imports: [],
  template: `
  <div #div class="d">Hello</div>
  <button (click)="click(div)">Click</button>
  `
})
export class JqueryExampleComponent {

  click(div){
    $(div).fadeOut().fadeIn()
  }

}


$(document).ready(()=>{
  $("button").click(()=>{
    $(".d").fadeOut().fadeIn()
  })
})