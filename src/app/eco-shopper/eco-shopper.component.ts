import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.serveice';// Assuming you have this service for product data
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eco-shopper',
  templateUrl: './eco-shopper.component.html',
  styleUrls: ['./eco-shopper.component.css'],
  standalone:true,
  imports:[FormsModule,CommonModule,HttpClientModule],
})
export class EcoShopperComponent implements OnInit {
  currentProduct: any = null;
  isOpen: boolean = true;
  searchQuery: string = '';
  loading: boolean = false;
  error: string | null = null;

  constructor(private productService: ProductService,private router: Router,) {}

  ngOnInit(): void {}


  handleCameraScan(): void {
    console.log('Scan started. Redirecting in 10 seconds...');

    // Delay for 10 seconds (10000 milliseconds)
    setTimeout(() => {
      // Navigate to the desired route, e.g., '/scan-result'
      this.router.navigate(['/shop']);
    }, 5000);
  }

  handleProductFound(product: any): void {
    this.productService.getSustainableAlternatives(product.name).subscribe({
      next: (alternatives) => {
        this.currentProduct = { ...product, alternatives };
      },
      error: (err) => {
        this.error = 'Failed to load product information';
        console.error('Error fetching product data:', err);
      },
    });
  }

  handleSearch(): void {
    if (!this.searchQuery.trim()) return;

    this.loading = true;
    this.error = null;
    this.productService.getProductData(this.searchQuery).subscribe({
      next: (data) => {
        if (!data) {
          this.error = 'Product not found';
        } else {
          this.handleProductFound(data);
        }
      },
      error: (err) => {
        this.error = 'Failed to load product information';
        console.error('Error fetching product data:', err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  getScoreColor(score: number): string {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-yellow-500';
    return 'text-red-500';
  }

  togglePanel(): void {
    this.isOpen = !this.isOpen;
  }

}