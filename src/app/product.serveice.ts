import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { z } from 'zod';

// Define the schemas using Zod
const ProductSchema = z.object({
  code: z.string(),
  product: z.object({
    product_name: z.string().optional().nullable(),
    brands: z.string().optional().nullable(),
    packaging: z.string().optional().nullable(),
    ecoscore_grade: z.string().optional().nullable(),
    ecoscore_score: z.number().optional().nullable(),
    carbon_footprint_from_known_ingredients_per_100g: z.number().optional().nullable(),
    labels: z.string().optional().nullable(),
    ingredients_text: z.string().optional().nullable(),
    manufacturing_places: z.string().optional().nullable()
  }).nullable()
});

const SearchResultSchema = z.object({
  count: z.number(),
  page: z.number(),
  products: z.array(z.object({
    code: z.string(),
    product_name: z.string().optional().nullable(),
    brands: z.string().optional().nullable(),
    ecoscore_score: z.number().optional().nullable()
  }))
});

export type OpenFoodFactsProduct = z.infer<typeof ProductSchema>;
export type SearchResult = z.infer<typeof SearchResultSchema>;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private static BASE_URL = 'https://world.openfoodfacts.org/api/v3';
  private static SEARCH_URL = 'https://world.openfoodfacts.org/cgi/search.pl';

  constructor(private http: HttpClient) {}

  private calculateEcoScore(ecoscore: number | null | undefined, ecoscore_grade?: string | null): number {
    if (typeof ecoscore === 'number') {
      return Math.round((ecoscore / 100) * 10);
    }

    if (ecoscore_grade) {
      switch (ecoscore_grade.toLowerCase()) {
        case 'a': return 9;
        case 'b': return 7;
        case 'c': return 5;
        case 'd': return 3;
        case 'e': return 1;
      }
    }

    return 0;
  }

  private formatCarbonFootprint(carbon: number | null | undefined): string {
    if (!carbon) return 'Not available';
    return `${carbon.toFixed(2)}kg CO2/100g`;
  }

  getProductData(identifier: string): Observable<any> {
    return this.http.get(`${ProductService.BASE_URL}/product/${identifier}.json`).pipe(
      catchError(error => {
        console.error('Error fetching product data:', error);
        return throwError(() => new Error('Failed to fetch product data'));
      }),
      map(response => {
        const parsed = ProductSchema.safeParse(response);
        if (!parsed.success || !parsed.data.product) {
          console.error('API response validation failed:', parsed.error);
          return null;
        }

        const product = parsed.data.product;
        return {
          name: product.product_name || 'Unknown Product',
          ecoScore: this.calculateEcoScore(product.ecoscore_score, product.ecoscore_grade),
          carbonFootprint: this.formatCarbonFootprint(product.carbon_footprint_from_known_ingredients_per_100g),
          packaging: product.packaging || 'Information not available',
          ethicalScore: this.calculateEcoScore(product.ecoscore_score, product.ecoscore_grade),
          manufacturer: product.brands || 'Unknown manufacturer',
          materials: [product.ingredients_text || 'Ingredients not available'],
          certifications: product.labels ? product.labels.split(',').map(l => l.trim()) : [],
          alternatives: [],
          manufacturingPlaces: product.manufacturing_places || 'Not specified'
        };
      })
    );
  }

  searchProduct(query: string): Observable<any[]> {
    const params = new URLSearchParams({
      search_terms: query,
      json: '1',
      page_size: '5',
      sort_by: 'popularity'
    });

    return this.http.get(`${ProductService.SEARCH_URL}?${params}`).pipe(
      catchError(error => {
        console.error('Error searching products:', error);
        return throwError(() => new Error('Failed to search products'));
      }),
      map(response => {
        const parsed = SearchResultSchema.safeParse(response);
        if (!parsed.success) {
          console.error('Search response validation failed:', parsed.error);
          return [];
        }

        return parsed.data.products.map(product => ({
          name: product.product_name || 'Unknown Product',
          barcode: product.code,
          brand: product.brands || 'Unknown Brand',
          ecoScore: this.calculateEcoScore(product.ecoscore_score)
        }));
      })
    );
  }

  getSustainableAlternatives(identifier: string): Observable<any[]> {
    return this.getProductData(identifier).pipe(
      catchError(() => of([])), // Return an empty array if there's an error
      switchMap(product => {
        if (!product) return of([]); // Return empty array if product is not found
  
        return this.searchProduct(product.name).pipe(
          map(searchResults => 
            searchResults.filter(alt => alt.ecoScore > (product.ecoScore || 0))
              .slice(0, 3)
              .map(alt => ({
                name: alt.name,
                ecoScore: alt.ecoScore,
                price: 'Price not available',
                link: `https://world.openfoodfacts.org/product/${alt.barcode}`,
                manufacturer: alt.brand,
                materials: ['Information not available'],
                certifications: []
              }))
          )
        );
      })
    );
  }
}