import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MockDataService} from '../mock-data.service';

import {Person} from '../mock-data.service';
import {PageRequestData} from '../component-wrapper/src/app/page-request-data';
import {TableResultsPage} from '../component-wrapper/src/app/table-results-page';
import {TableColumn} from '../component-wrapper/src/app/table-column';
import {ActivatedRoute} from '@angular/router';
import {TableComponent} from '../component-wrapper/src/app/table/table.component';
//import {Http} from '@angular/http';

import {HttpClient} from "@angular/common/http"; 
//import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { AuthenticationService } from '../_services/index';

@Component({
    selector: 'app-test-component',
//  templateUrl: './test.component.html',
    template:` 
    <app-dashboard class="mx-auto col-8"  [curcontents]="curcontents"></app-dashboard> 
<div class="container mx-auto col-8">
<ngb-tabset>
  <ngb-tab title="Simple">
    <ng-template ngbTabContent>
      
    </ng-template>
  </ngb-tab>
  <ngb-tab>
    <ng-template ngbTabTitle><b>Fancy</b> title</ng-template>
    <ng-template ngbTabContent>
    </ng-template>
  </ngb-tab>
  <ngb-tab title="Disabled" [disabled]="true">
    <ng-template ngbTabContent>
      <p>Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales nibh elit id diam. Nulla facilisi. Donec egestas ligula vitae odio interdum aliquet. Duis lectus turpis, luctus eget tincidunt eu, congue et odio. Duis pharetra et nisl at faucibus. Quisque luctus pulvinar arcu, et molestie lectus ultrices et. Sed diam urna, egestas ut ipsum vel, volutpat volutpat neque. Praesent fringilla tortor arcu. Vivamus faucibus nisl enim, nec tristique ipsum euismod facilisis. Morbi ut bibendum est, eu tincidunt odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris aliquet odio ac lorem aliquet ultricies in eget neque. Phasellus nec tortor vel tellus pulvinar feugiat.</p>
    </ng-template>
  </ngb-tab>
</ngb-tabset>


<ngx-iq-table
                [tableId]="'testTable'"
                [dataSource]="dataSource"
                [columns]="columns"
                [pageSize]=5>
            <ng-template #rows let-item="$implicit" let-i="index">
                <tr>
                    <td>{{item.id}}</td>
                    <td>{{item.category}}</td> <!-- item.id -->
                    <td ><a routerLink="/dashboard/{{i}}" (click)="handleHeaderRowClick(i)">{{item.title}}</a></td>
                    
 <!--  <a [routerLink]="['/dashboard', item.title]" <td><a ng-href="#/write">{{item.title}}</a></td>-->         
                </tr>
            </ng-template>
        </ngx-iq-table>

        <div class="text-right">  
            <button type="button" class="btn btn-primary" (click)="logout()">로그아웃</button>     
            <button type="button" class="btn btn-primary" routerLink="/login">로그인</button>     
            <button type="button" class="btn btn-primary" routerLink="/write">글쓰기</button>                   
        </div> 
        <router-outlet></router-outlet>
    </div>
`,

    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AfterViewChecked {

    @ViewChild(TableComponent) table: TableComponent;    
    @ViewChild(DashboardComponent) dashboard: DashboardComponent;
    
    private person : Person[];
    dataSource: (requestPageData: PageRequestData) => Observable<TableResultsPage>;
    
    columns: TableColumn[] = [
        {
            name: 'Id',
            prop: 'author',
            width: 10,
            widthUnit: '%'
        }, {
            name: 'category',
            prop: 'category',
            width: 30,
            widthUnit: '%'
        },{
            name: 'title',
            prop: 'title',
            width: 30,
            widthUnit: '%'
        } 
    ];
    curcontents : string ;
    
    constructor(private mockDataService: MockDataService,
                private tableComponent: TableComponent,
                private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private _http: HttpClient) 
    {
        console.log("constructor");
    //    this.getdata();        
    }
    ngAfterViewChecked(){
    //    console.log("AfterViewChecked");           
        if( this.person ){
           const id = +this.activatedRoute.snapshot.paramMap.get('id') ; 
//           console.log( "id", id , this.person[id].contents );
             
     //      this.dashboard.setcontents( this.person[id].contents );
        }
    }
    handleHeaderRowClick(data){
   //    console.log("hi");
       const id = +this.activatedRoute.snapshot.paramMap.get('id') ;  
       this.dashboard.setcontents( data ); 
    //   const id = +this.activatedRoute.snapshot.paramMap.get('id') ;
    //   console.log( "dash", id , this.person );
    //   this.test = id ;
    }/*
    fetchEvent(){
        return  this._http.get('http://121.157.55.240:8080/api/books')
                    .map((res: Response) => res.json())
                     .then( 
                            this.mockDataService.setdata(data);
                     ); 
    }*/
    ngOnInit(): void {   
          
          this.getdata();   
          this.getdata1(); 
          
          console.log( "this.curcontents" , this.curcontents ) ;
/*
        if( this.person ){
               const id = +this.activatedRoute.snapshot.paramMap.get('id') ; 
               console.log( "id", id ,this.person[id].contents );
               this.dashboard.setcontents( this.person[id].contents );
              
        }
*/        
    }
    getdata1() {
        console.log("AD");
        this._http.get('http://121.157.55.240:8080/api/books')
 //                   .map((res: Response) => res.json())
                    .subscribe(data => {                            
                            this.person = data ;
                            this.mockDataService.setdata(data);
                            this.table.onPageClicked(0) ;
                            this.curcontents = this.person ;
                            console.log("aa", this.person );                        
        });
    }
    logout(){
       this.authenticationService.logout();
    }
    getdata(){           
      this.dataSource = (rpd => this.mockDataService.listPersons(rpd.from, rpd.count, rpd.orderBy ));        
            const currentPage = this.activatedRoute.snapshot.queryParams['currentPage'];
    //      console.log("getdata", this.dataSource);
            if (currentPage) {
                this.table.currentPage = Number(currentPage);
            }    
    }

    get1(): void {
 //      this.tableComponent.refreshData();
       this.table.onPageClicked(0) ;
    }
    
}
