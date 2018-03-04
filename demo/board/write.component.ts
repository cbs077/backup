import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MockDataService} from '../mock-data.service';
import {PageRequestData} from '../component-wrapper/src/app/page-request-data';
import {TableResultsPage} from '../component-wrapper/src/app/table-results-page';
import {TableColumn} from '../component-wrapper/src/app/table-column';
import {ActivatedRoute} from '@angular/router';
import {TableComponent} from '../component-wrapper/src/app/table/table.component';

import { SearchMovieModel } from './search-movie.model';
import { WebApiObservableService } from './web-api-observable.service';

@Component({
//    selector: 'app-test-component',
//  templateUrl: './test.component.html',
    template:`
     <div class="mx-auto" style="width:80% ; margin-top:30px; margin-left:auto; margin-right:auto;">

<input [(ngModel)]="category"  class="form-control col-3">       
<input [(ngModel)]="title"  class="form-control col-9">
    
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
        <button type="button" class="btn btn-primary centered"  (click)="save()">���옣</button> 
         
        <!--    <button class="btn btn-sm" [routerLink]="['/test2']">Navegar</button> -->
     </div>
`,

    styleUrls: ['./test.component.css']
})
export class WriteComponent implements OnInit {

    category: string;
    title: string;
    
    @ViewChild(TableComponent) table: TableComponent;
    dataSource: (requestPageData: PageRequestData) => Observable<TableResultsPage>;
    columns: TableColumn[] = [
        {
            name: 'Id',
            prop: 'id',
            width: 10,
            widthUnit: '%'
        }, {
            name: 'First name',
            prop: 'firstname',
            width: 30,
            widthUnit: '%'
        }, {
            name: 'Last name',
            prop: 'lastname',
            width: 30,
            widthUnit: '%'
        }, {
            name: 'E-Mail',
            prop: 'email',
            width: 30,
            widthUnit: '%'
        }
    ];

    searchMovieModel: SearchMovieModel;
    constructor(private mockDataService: MockDataService,
                private activatedRoute: ActivatedRoute,
                private movieObservableService: WebApiObservableService) {
        
        this.searchMovieModel = {  "title": "12" , "author": "abc"};
    }

    ngOnInit(): void {
        this.dataSource = (rpd => this.mockDataService.listPersons(rpd.from, rpd.count, rpd.orderBy));
        const currentPage = this.activatedRoute.snapshot.queryParams['currentPage'];

        if (currentPage) {
            this.table.currentPage = Number(currentPage);
        }
    }

   save(): void {
    if ( CKEDITOR.instances.editor1.getData() == '' )
     alert( 'There is no data available.' );
   
   console.log( CKEDITOR.instances.editor1.getData() );
    var contents = CKEDITOR.instances.editor1.getData()  ;
    this.searchMovieModel = {  "category": this.category , "title": this.title , "contents": contents};  

    this.movieObservableService
            .createService('http://121.157.55.240:8080/api/books', this.searchMovieModel )
            .subscribe(
                result => console.log("5. createService: " , result)
    //            error => this.errorMessage = <any>error
    );   
  }

}
