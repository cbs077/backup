import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MockDataService} from '../mock-data.service';
import {PageRequestData} from '../component-wrapper/src/app/page-request-data';
import {TableResultsPage} from '../component-wrapper/src/app/table-results-page';
import {TableColumn} from '../component-wrapper/src/app/table-column';
import {ActivatedRoute} from '@angular/router';
import {TableComponent} from '../component-wrapper/src/app/table/table.component';

@Component({
    selector: 'app-test-component',
//  templateUrl: './test.component.html',
    template:` 
    <div class="container">
        <ngx-iq-table
                [tableId]="'testTable'"
                [dataSource]="dataSource"
                [columns]="columns"
                [pageSize]=5>
            <ng-template #rows let-item="$implicit" let-i="index">
                <tr>
                    <td>{{item.id}}</td>
                    <td>{{item.firstname}}</td>
                    <td>{{item.lastname}}</td>
                    <td>{{item.email}}</td>
                </tr>
            </ng-template>
        </ngx-iq-table>
    </div>
    
    <!--    <button class="btn btn-sm" [routerLink]="['/test2']">Navegar</button> -->
    `,

    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

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

    constructor(private mockDataService: MockDataService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.dataSource = (rpd => this.mockDataService.listPersons(rpd.from, rpd.count, rpd.orderBy));
        const currentPage = this.activatedRoute.snapshot.queryParams['currentPage'];

        if (currentPage) {
            this.table.currentPage = Number(currentPage);
        }
    }
    
}
