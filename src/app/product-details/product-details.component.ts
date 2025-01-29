import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
        selector: 'app-product-details',
        standalone: true,
        imports: [FormsModule, CommonModule,RouterLink],
        templateUrl: './product-details.component.html',
        styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent  {
    searchQuery: string = '';
    searchResults: any[] = [];
  
    // Sample product data
    products = [
      { id: 1, name: 'Organic Peanut Butter', image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg', description: 'Made with 100% organic peanuts.', price: '599' },
      { id: 2, name: 'Eco-Friendly Water Bottle', image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg', description: 'Reusable and BPA-free.', price: '299' },
      { id: 2, name: 'Crunchy Peanut Butter', image: 'https://images.pexels.com/photos/7098689/pexels-photo-7098689.jpeg', description: 'Enjoy the crunch in every bite.', price: '$6.99' },
    { id: 3, name: 'Peanut Brittle', image: 'https://images.pexels.com/photos/8486825/pexels-photo-8486825.jpeg', description: 'Sweet and crunchy treat made from peanuts.', price: '$4.99' },
    { id: 4, name: 'Roasted Peanuts', image: 'https://images.pexels.com/photos/7129621/pexels-photo-7129621.jpeg', description: 'Perfectly roasted and salted peanuts.', price: '$3.49' },
    { id: 5, name: 'Honey-Coated Peanuts', image: 'https://images.pexels.com/photos/8128051/pexels-photo-8128051.jpeg', description: 'Deliciously sweet honey-coated peanuts.', price: '$5.49' },
    { id: 6, name: 'Peanut Protein Bars', image: 'https://images.pexels.com/photos/3850498/pexels-photo-3850498.jpeg', description: 'High-protein snack with peanut goodness.', price: '$7.99' },
    ];
  
    handleSearch() {
      if (this.searchQuery.trim() === '') {
        this.searchResults = [];
        return;
      }
  
      this.searchResults = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
  
      this.searchQuery = ''; // Clear the search query after displaying results
    }
  }