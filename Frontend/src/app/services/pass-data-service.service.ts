import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassDataServiceService {

  index!: number;

  setIndex(id: number) {
    this.index = id;
    console.log("Receive it!!!!!!");
  }

  getIndex() {
    return this.index;
  }
  constructor() { }
}
