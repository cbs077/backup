import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MockDataService} from '../mock-data.service';
import {PageRequestData} from '../component-wrapper/src/app/page-request-data';
import {TableResultsPage} from '../component-wrapper/src/app/table-results-page';
import {TableColumn} from '../component-wrapper/src/app/table-column';
import {ActivatedRoute} from '@angular/router';
import {TableComponent} from '../component-wrapper/src/app/table/table.component';
import { Http} from '@angular/http';

@Component({
//    selector: 'app-test-component',
//  templateUrl: './test.component.html',
    template:` 
    <div class="container mx-auto col-8">
        <ngx-iq-table
                [tableId]="'testTable'"
                [dataSource]="dataSource"
                [columns]="columns"
                [pageSize]=5>
            <ng-template #rows let-item="$implicit" let-i="index">
                <tr>
                    <td>{{item.category}}</td>
                    <td>{{item.author}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.contents}}</td>
                </tr>
            </ng-template>
        </ngx-iq-table>
        <div class="text-right">  
            <button type="button" class="btn btn-primary" (click)="getMyBlog()" >get</button> 
            <button type="button" class="btn btn-primary" routerLink="/write">글쓰기</button>                   
        </div> 
        <router-outlet></router-outlet>
    </div>
`,

    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

    @ViewChild(TableComponent) table: TableComponent;
    dataSource: (requestPageData: PageRequestData) => Observable<TableResultsPage>;
    columns: TableColumn[] = [
        {
            name: 'Id',
            prop: 'author',
            width: 10,
            widthUnit: '%'
        }, {
            name: 'title',
            prop: 'title',
            width: 30,
            widthUnit: '%'
        }, {
            name: 'category',
            prop: 'category',
            width: 30,
            widthUnit: '%'
        }, {
            name: 'E-Mail',
            prop: 'contents',
            width: 30,
            widthUnit: '%'
        }
    ];

    constructor(private mockDataService: MockDataService,
                private activatedRoute: ActivatedRoute,
                private _http: Http) {
    }

    ngOnInit(): void {    
    //    getdata(data);
         this.getdata1();
    
         this.getdata();
    }
    getdata1() {
        return this._http.get('http://121.157.55.240:8080/api/books')
                    .map((res: Response) => res.json())
                     .subscribe(data => {
        //                  this.data = data;
                            this.mockDataService.setdata(data);
        //                    this.getdata(data)
                            console.log("getdata1", data);
        });
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
        console.log("test"); 
        const req = new XMLHttpRequest();
    //    req.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
        req.open('GET', 'http://121.157.55.240:8080/api/books');  
        req.onload = () => {
            console.log( req.response) ;
            this.dataSource = (rpd => this.mockDataService.listPersons(rpd.from, rpd.count, rpd.orderBy, req.response));
        
            const currentPage = this.activatedRoute.snapshot.queryParams['currentPage'];
            console.log("asd", this.dataSource);
            if (currentPage) {
                this.table.currentPage = Number(currentPage);
            }
//            console.log( JSON.parse( req.response)[8]["contents"] );
//            this.username = JSON.parse( req.response)[11]["contents"] ;
//            this.div.nativeElement.innerHTML = JSON.parse( req.response)[11]["contents"];
                   
        }
        req.send();
    }
  }
    
}
