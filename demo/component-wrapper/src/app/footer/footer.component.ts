import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableResultsPage} from '../table-results-page';
import {FooterLegend} from './footer-legend';

const PAGES_LIMIT = 6;

@Component({
    selector: 'ngx-iq-footer',
    template: `<div class="row" *ngIf="getTotalPages() > 1">
    <div class="col-sm-6">
        <div class="pull-left">
            <div class="results-count" *ngIf="!getTotal() || getTotal() === 0">
                {{ footerLegend.noresults }}
            </div>
            <div class="results-count" *ngIf="getTotal() && getTotal() > 0">
                {{ footerLegend.showingResults }} {{getPageBeginning()}} {{ footerLegend.to }} {{getPageEnd()}} {{
                footerLegend.of }} {{getTotal()}}
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="pull-right">
            <nav aria-label="Page navigation">
                <ul class="pagination">
                    <li>
                        <a (click)="onFirstClicked()" aria-label="First" *ngIf="isFirstPageVisible()">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li *ngFor="let item of getPages()" [class.active]="item === getCurrentPage() + 1"><a
                            (click)="pageClicked(item)">{{item}}</a></li>
                    <li>
                        <a (click)="onLastClicked()" aria-label="Last" *ngIf="isLastPageVisible()">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</div>
`,
//    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    @Input() resultsPage: TableResultsPage;
    @Output() onPageClicked: EventEmitter<number> = new EventEmitter<number>();
    @Input() footerLegend: FooterLegend;
    @Input() currentPage;

    constructor() {
    }

    ngOnInit() {
    }

    getPageBeginning(): number {
        return this.resultsPage.from + 1;
    }

    getPageEnd(): number {
        return Math.min(this.resultsPage.from + this.resultsPage.count, this.resultsPage.total);
    }

    getTotal(): number {
        return this.resultsPage.total;
    }

    getPages(): number[] {
        const pages: number[] = [];
        const radio: number = PAGES_LIMIT / 2;
        const currentPage: number = this.currentPage; // this.getCurrentPage();
        const totalPages: number = this.getTotalPages();
        let firstPage: number;
        let lastPage: number;

        if (totalPages - currentPage <= radio) {
            firstPage = Math.max(0, totalPages - PAGES_LIMIT);
            lastPage = totalPages;
        } else if (currentPage <= radio) {
            firstPage = 0;
            lastPage = Math.min(totalPages, PAGES_LIMIT);
        } else {
            firstPage = currentPage - radio;
            lastPage = currentPage + radio;
        }

        for (let i = firstPage; i < lastPage; i++) {
            pages.push(i + 1);
        }

        return pages;
    }

    getTotalPages() {
        return Math.ceil((this.getTotal() / this.resultsPage.count));
    }

    isFirstPageVisible(): boolean {
        const currentPage = this.getCurrentPage();
        return currentPage > PAGES_LIMIT / 2 && this.getTotalPages() > PAGES_LIMIT;
    }

    isLastPageVisible(): boolean {
        const totalPages = this.getTotalPages();
        return totalPages - this.currentPage > PAGES_LIMIT / 2 && totalPages > PAGES_LIMIT;
    }

    pageClicked(page: number) {
        this.currentPage = page - 1;
        this.onPageClicked.emit(page - 1);
    }

    onFirstClicked() {
        this.currentPage = 0;
        this.onPageClicked.emit(this.currentPage);
    }

    onLastClicked() {
        this.currentPage = this.getTotalPages() - 1;
        this.onPageClicked.emit(this.currentPage);
    }

    getCurrentPage() {
        return this.currentPage;
    }

}
