import { Component, OnInit } from '@angular/core';
/*
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
*/

@Component({
  selector: 'app-dashboard',
  template: `<div>test</div>
             <app-test-component></app-test-component>
             <router-outlet></router-outlet>`
})
export class DashboardComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }

  getHeroes(): void {
  }
}
