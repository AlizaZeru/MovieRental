import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  styles:[`
  #menuDiv{
    background-color: #2e241c;
    width: 110%;
    color: #7a6f64;
    font-size: 40px;
    font-weight:bold;
  }
  li{
    margin-left:60px;
    }`],
  template: `
  <nav class="navbar navbar-inverse" id="menuDiv">
  <div class="container-fluid">
    <ul class="nav navbar-nav">
      <li><a [routerLink]="['/Movie']">Movies</a></li>
      <li><a [routerLink]="['/Customer']">Customers</a></li>
      <li><a [routerLink]="['/Rental']">Rentals</a></li>
    </ul>
  </div>
</nav>
<router-outlet></router-outlet>`,
})
export class AppComponent  { }
