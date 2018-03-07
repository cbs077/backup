import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
//
import {NgxIqTableModule} from './component-wrapper/src/app/ngx-iq-table.module';
import {TableComponent} from './component-wrapper/src/app/table/table.component';
import {MockDataService} from './mock-data.service';
//import {AppRoutingModule} from './app-routing.module';
import {TestComponent} from './board/test.component';
import {WriteComponent} from './board/write.component';
import {DashboardComponent} from './board/dashboard.component';

//
import { CKEditorModule } from 'ng2-ckeditor';

import { NgxDatatableModule } from '../src';
import { AppComponent } from './app.component';

//import { BsDropdownModule } from 'ngx-bootstrap';
//import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule  } from 'ngx-bootstrap/buttons';
import { TypeaheadModule  } from 'ngx-bootstrap/typeahead';

import {AppRoutingModule} from './app-routing.module'
// -- test.ts
import { BasicTestComponent } from './test/basic-test.component';

import { WebApiObservableService } from './board/web-api-observable.service';
@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    WriteComponent,
    DashboardComponent
  ],
  imports: [HttpModule,
     BrowserModule,
     CKEditorModule,
     NgxDatatableModule, 
     NgxIqTableModule,
     AppRoutingModule,
//   ButtonsModule.forRoot(), 
   RouterModule.forRoot([
          {  path: 'write',  component: WriteComponent },       
          {  path: 'test',  component: TestComponent },
          { path: 'dashboard', component: DashboardComponent }
    ],{useHash: true} ),
     
 //  TypeaheadModule.forRoot(),
     FormsModule ],
  
  providers: [ WebApiObservableService ,MockDataService , TableComponent, {provide: APP_BASE_HREF, useValue : '/' } ],
  bootstrap: [AppComponent]
//  bootstrap: [AppComponent]
})
export class AppModule { 
    
}
