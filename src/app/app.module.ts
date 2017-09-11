import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AppComponent }  from './app.component';
import { CustomerComponent }  from './Customer/customer.component';
import { MovieComponent }  from './Movie/movie.component';
import { RentalComponent }  from './Rental/rental.component';
import { PageNotFoundComponent } from './PageNotFound/page-not-found.component';



const appRoutes: Routes = [
 { path: 'Movie', component: MovieComponent },
 { path: 'Customer', component: CustomerComponent },
 { path: 'Rental', component: RentalComponent },
 { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports:      [ BrowserModule, HttpModule , FormsModule, RouterModule.forRoot(appRoutes)],
  declarations: [ AppComponent , MovieComponent, CustomerComponent, RentalComponent, PageNotFoundComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
