import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class RecommendationComponent implements OnInit {
  productCodes: number[] = [];
  productsWithImage: { code: number; image: string | null }[] = [];
  searchInput: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // Fetch similar product codes from your backend
  fetchSimilarProducts(): void {
    const productCode = this.searchInput.trim();
    if (!productCode) {
      console.error('Please enter a valid product code.');
      return;
    }

    const apiUrl = `http://127.0.0.1:5000/get_similar_products?product_code=${productCode}`;
    this.http.get<{ similar_products: number[] }>(apiUrl).subscribe(
      (response) => {
        this.productCodes = response.similar_products;
        console.log('Similar product codes:', this.productCodes);

        // Fetch product images for the similar products
        this.fetchProductImages();
      },
      (error) => {
        console.error('Error fetching similar product codes:', error);
      }
    );
  }

  // Fetch product images from the OpenFoodFacts API
  fetchProductImages(): void {
    this.productsWithImage = []; // Reset the product list
    this.productCodes.forEach((code) => {
      const apiUrl = `https://world.openfoodfacts.org/api/v3/product/${code}.json`;
      this.http.get<{ product: { product_image_url: string } }>(apiUrl).subscribe(
        (response) => {
          const imageUrl = response?.product?.product_image_url;

          // Push the code with the image URL or null if no image is found
          this.productsWithImage.push({ code, image: imageUrl || null });
        },
        (error) => {
          console.error(`Error fetching product details for code ${code}:`, error);

          // Push the code with null if there's an error
          this.productsWithImage.push({ code, image: null });
        }
      );
    });
  }
}