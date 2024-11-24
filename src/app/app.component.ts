import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, ROUTES } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

 
  products = [
    { id: 1, name: 'Electronic Watch 1', price: 199.99, image: 'assets/wave1.jpeg' },
    { id: 2, name: 'Electronic Watch 2', price: 249.99, image: 'assets/wave2.jpeg' },
    { id: 3, name: 'Electronic Watch 3', price: 299.99, image: 'assets/wave3.jpeg' },
    { id: 4, name: 'Electronic Watch 4', price: 349.99, image: 'assets/wave4.jpeg' },
    { id: 5, name: 'Electronic Watch 5', price: 399.99, image: 'assets/wave5.jpeg' },
    { id: 6, name: 'Electronic Watch 6', price: 449.99, image: 'assets/wave6.jpeg' },
    { id: 7, name: 'Electronic Watch 7', price: 499.99, image: 'assets/wave7.webp' },
    { id: 8, name: 'Electronic Watch 8', price: 549.99, image: 'assets/wave8.jpeg' },
    { id: 9, name: 'Electronic Watch 9', price: 599.99, image: 'assets/wave9.jpeg' },
    { id: 10, name: 'Electronic Watch 10', price: 649.99, image: 'assets/wave10.jpeg' },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
