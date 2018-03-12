import { Component, OnInit, Input, OnChanges, AfterViewChecked, SimpleChange,
 ViewChild, AfterViewInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Person} from '../mock-data.service';

/*
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
*/

@Component({
  selector: 'app-dashboard',
  template: ` <!-- <div>test:{{test}}</div>
   <div class="container-fluid bg-1 text-center"></div> -->
    <div class="w3-example mx-auto col-8"> 
        <span [innerHTML]="myHtml"></span>     
    </div>
     <!--         <app-test-component></app-test-component>
              <router-outlet></router-outlet> -->`,
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  
  constructor(
//    private renderer:Renderer
  //  private route: ActivatedRoute,
  ) { }

  test : number ;
  @Input() curcontents : string ;
//  @ViewChild('one') d1:ElementRef;
  prenpendHtml: string = '<div><b>this prepended html</b></div>';

  test1(){
    console.log("test");        
  }
    
  ngOnInit() {
  //    const id = +this.route.snapshot.paramMap.get('id') ;
  //    console.log( "dash", id , this.person );
  //    this.test = id ;
  }
  
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
     console.log( "ngOnChanges" );
    }
  }/*
  ngAfterViewInit() {
    console.log('AfterViewInit');
  }*/
  setcontents(test): void {
  //    d1.nativeElement.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
      
      
      this.test = test ;
      this.test = this.curcontents[test].contents ;
      this.myHtml = this.test;
      console.log( "curcontents:", this.curcontents );
  }
}
