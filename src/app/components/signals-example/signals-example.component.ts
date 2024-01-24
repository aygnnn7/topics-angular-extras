import { Component, Signal, WritableSignal, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals-example',
  standalone: true,
  imports: [],
  template: `
  Signal x = {{x()}} <br>
  Signal z = {{z()}} <br>
  Signal Person Name - {{personSignal().name}}
  <hr>
  <button (click)="setValue()">increase signal value by 1 using 'update' function </button> <br>
  <button (click)="changeName()">change name value of signal object using 'update' function </button> <br>
  <button (click)="onComputed()">compute</button> <br>
  <button (click)="onEffect()">effect</button>
  `
})
export class SignalsExampleComponent {
  x: WritableSignal<number>;
  y: Signal<string>;
  personSignal: WritableSignal<Person>;7
  z: WritableSignal<number>;
  constructor() {
    this.x = signal(3);
    this.x.set(0);

    this.personSignal = signal(new Person("John"));

    this.z = signal(5);
    effect(() => console.log(`z value: ${this.z()}`));
  }
  setValue() {
    this.x.update(data => data++);
  }
  changeName(){
    this.personSignal.update(data => new Person("Jack")); 
  }
  onComputed(){
    this.x.update(data => data + 1);
    this.y = computed(() => `Tha value of x changed to ${this.x()}`)
    console.log(this.y());
  }
  onEffect(){
    this.z.update(data => data + 1);
  }
}

export class Person {
  constructor(name:string){
    this.name = name;
  }
  name: string;
}
