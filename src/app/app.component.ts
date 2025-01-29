import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HttpClientModule,CommonModule,RouterOutlet],
  standalone:true
})
export class AppComponent {

}
