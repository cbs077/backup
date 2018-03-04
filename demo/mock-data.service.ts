import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {TableResultsPage} from './component-wrapper/src/app/table-results-page';
import {ColumnOrder} from './component-wrapper/src/app/column-order';
import { Http} from '@angular/http';

export class Person {
    author: number;
    category: string;
    contents: string;
    title: string;
}

@Injectable()
export class MockDataService {

    private persons: Person[] = [{
        'author1': 1,
        'title': 'Evelyn',
        'contents': 'Burns',
        'category': 'eburns0@amazon.co.uk'
    }, {
        'author': 2,
        'title': 'Jacqueline',
        'contents': 'Montgomery',
        'category': 'jmontgomery1@fda.gov'
    }, {
        'author': 3,
        'title': 'Albert',
        'contents': 'Moreno',
        'category': 'amoreno2@mac.com'
    }, {
        'author': 4,
        'title': 'Donna',
        'contents': 'Hawkins',
        'category': 'dhawkins3@hud.gov'
    }, {
        'author': 5,
        'title': 'Davauthor',
        'contents': 'Nichols',
        'category': 'dnichols4@pen.io'
    }, {
        'author': 6,
        'title': 'Diana',
        'contents': 'Garcia',
        'category': 'dgarcia5@amazon.com'
    }];

    constructor( private _http: Http ) {

    }

    public listPersons(from: number, count: number, orderBy: ColumnOrder[] ): Observable<TableResultsPage> {
           console.log( "count", count );
    
            const result = this.persons.slice(from, from + count);
    //      const result = data.slice(from, from + count);
    
    //      console.log( "result", result ) ;
            console.log( "persons", this.persons ) ;  
            
            const pr = new TableResultsPage();
            pr.count = count;
            pr.from = from;
            pr.total = this.persons.length;
            pr.results = result;
    //      pr.results = data;
    
    //      console.log("pr", pr);
            return Observable.of(pr);


    }
    public setdata(data){
        console.log( "setdata", data );
        this.persons = data ;
               
    }
    getMyBlog() {
        return this._http.get('http://121.157.55.240:8080/api/books')
                    .map((res: Response) => res.json())
                     .subscribe(data => {
                           // this.data = data;
                           // this.getdata(data)
                            this.persons  = data;
                            console.log("getMyBlog()", data);
        });
    }
    public listPersons1(from: number, count: number, orderBy: ColumnOrder[] ): Observable<TableResultsPage> {
            this.getMyBlog() ;
        //this.persons  = data;  
            console.log("person",  this.persons );
            const result = this.persons.slice(from, from + count);
    //        console.log( "listPersons1", data ) ;  
            
            const pr = new TableResultsPage();
            pr.count = count;
            pr.from = from;
            pr.total = this.persons.length;
            pr.results = result;
    //      pr.results = data;
    
            console.log("pr", pr);
            return Observable.of(pr);
    }

    private sortFunction(order) {
        return (person1: Person, person2: Person) => {
            if ('asc' === order.direction) {
                if (person1[order.property] > person2[order.property]) {
                    return 1;
                }
                if (person1[order.property] < person2[order.property]) {
                    return -1;
                }
            } else {
                if (person1[order.property] < person2[order.property]) {
                    return 1;
                }
                if (person1[order.property] > person2[order.property]) {
                    return -1;
                }
            }
            return 0;
        };
    }

}
