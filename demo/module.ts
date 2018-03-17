import { NgModule, ApplicationRef } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//mport { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { WebApiObservableService } from './board/web-api-observable.service';
/*
// -- login
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
*/
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
//import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

@NgModule({
  declarations: [
    AppComponent,    
    TestComponent,
    WriteComponent,
    DashboardComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent    
  ],
  imports: [
     BrowserModule,
     NgbModule.forRoot(),
     HttpClientModule,
     CKEditorModule,
     NgxDatatableModule, 
     NgxIqTableModule,
     AppRoutingModule,
//   ButtonsModule.forRoot(), 
   RouterModule.forRoot([
          {  path: 'write',  component: WriteComponent },       
          {  path: 'test',  component: TestComponent },
          { path: 'dashboard', component: TestComponent },
          { path: 'dashboard/:id', component: TestComponent },
          { path: '', component: HomeComponent, canActivate: [AuthGuard] },
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
    ],{useHash: true} ),
     
 //  TypeaheadModule.forRoot(),
     FormsModule ],
  
  providers: [ WebApiObservableService,
               MockDataService , 
               TableComponent, 
               {provide: APP_BASE_HREF, useValue : '/' },
               AuthGuard,
               AlertService,
               AuthenticationService,
               UserService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: JwtInterceptor,
                    multi: true
                },       
                // provider used to create fake backend
                fakeBackendProvider
        ],
  bootstrap: [AppComponent]
//  bootstrap: [AppComponent]
})
export class AppModule { 
    
}
