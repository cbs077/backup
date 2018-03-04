import { Component, ViewChild,ElementRef } from '@angular/core';
import { SearchMovieModel } from './search-movie.model';
import { WebApiObservableService } from './web-api-observable.service';

@Component({
  selector: 'basic-test-demo',
  template: `
    <div>
      <h3>
        Test
      </h3>
      <pre class="card card-block card-header">Model: {{selected | json}}</pre>
      <input [(ngModel)]="selected"
             [typeahead]="states"
             class="form-control">

      <pre class="card card-block card-header">{{singleModel}}</pre>
      <button type="button" class="btn btn-primary"
              [(ngModel)]="singleModel" btnCheckbox
              btnCheckboxTrue="1" btnCheckboxFalse="0">
        Single Toggle
      </button>
      <button type="button" class="btn btn-primary"
              (click)="create()">
        create
      </button>    
      <button type="button" class="btn btn-primary"
              (click)="get1()">
        getAllBooks
      </button> 
          
      <a routerLink="/heroes">Heroes</a>
      <router-outlet></router-outlet>

      <a routerLink="/test">test</a>
      <router-outlet></router-outlet>

      <ckeditor
          [(ngModel)]="ckeditorContent">
            <ckbutton [name]="'saveButton'"
              [command]="'saveCmd'"
              (click)="save($event)"
              [icon]="'save.png'"
              [label]="'Save Document'"
              [toolbar]="'clipboard,1'">
            </ckbutton>
      </ckeditor>
      <div #div ></div>

    </div>
  `,
  providers: [WebApiObservableService]

})
export class BasicTestComponent {

  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  username = "";
    
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company', sortable: false }
  ];
  singleModel: string = '1';
     
  selected: string;
  states: string[] = [ 
      '가나',
      'abc'
  ];  
  searchMovieModel: SearchMovieModel;

  @ViewChild('div') div:ElementRef;

  constructor(private movieObservableService: WebApiObservableService) {    
    this.fetch((data) => {
      //this.rows = 
      console.log( data ) ;
      //  setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
    this.searchMovieModel = {  "title": "12" , "author": "abc"};

  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'http://121.157.55.240:8080/about');
    req.onload = () => {
    console.log( req.response ) ;
        
    }
    req.send();
  }
  create(): void {
    if ( CKEDITOR.instances.editor1.getData() == '' )
     alert( 'There is no data available.' );
   
   console.log( CKEDITOR.instances.editor1.getData() );
    var contents = CKEDITOR.instances.editor1.getData()  ;
    this.searchMovieModel = {  "title": "12" , "author": "abc", "contents": contents};  

    this.movieObservableService
            .createService('http://121.157.55.240:8080/api/books', this.searchMovieModel )
            .subscribe(
                result => console.log("5. createService: " , result)
    //            error => this.errorMessage = <any>error
    );   
  }
  apply(): void {
    console.log("test"); 
    const req = new XMLHttpRequest();
//    req.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    req.open('POST', 'http://121.157.55.240:8080/api/books');  
    req.onload = () => {
     console.log( req.response ) ;        
    }
    req.send();

  }
  get1(): void {
    console.log("test"); 
    const req = new XMLHttpRequest();
//    req.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    req.open('GET', 'http://121.157.55.240:8080/api/books');  
    req.onload = () => {
        console.log( req.response) ;
        console.log( JSON.parse( req.response)[8]["contents"] );
        this.username = JSON.parse( req.response)[11]["contents"] ;
        this.div.nativeElement.innerHTML = JSON.parse( req.response)[11]["contents"];
               
    }
    req.send();

  }
    /*
    private getMyBlog() {
    return this._http.get('https://public-api.wordpress.com/rest/v1.1/sites/oliverveits.wordpress.com/posts/3078')
                .map((res: Response) => res.json())
                 .subscribe(data => {
                        this.data = data;
                        console.log(this.data);
                });
  }
 */
}
