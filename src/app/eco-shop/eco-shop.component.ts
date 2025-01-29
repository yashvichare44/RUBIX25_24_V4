import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eco-shop',
  templateUrl: './eco-shop.component.html',
  styleUrls: ['./eco-shop.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class EcoShopComponent {
  product = {
    product_name: 'Peanut Butter',
    products_generic_name_en: 'Smooth Peanut Butter',
    products_image_url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=800&q=80',
    product_brands: 'Brand A',
    product_brand_owner: 'Brand A Inc.',
    products_countries: ['US', 'Canada', 'UK', 'Australia'],
    products_labels: 'Gluten-Free, Non-GMO, Organic',
    products_ingrident_ingrident_analysis: ['Vegan', 'Palm oil-free', 'No additives', 'Organic certified'],
    products_image_ingredients_url: 'https://static.openfoodfacts.org/images/products/737/628/064/502/ingredients_en.6.400.jpg',
    product_image_nutrition_url: 'https://images.openfoodfacts.org/images/products/501/366/510/8801/nutrition_en.29.400.jpg',
    products_nutriment: {
      sugar: 'low',
      fat: 25,
      proteins: 15,
    },
    products_nutriscore_data: {
      grade: 'B',
      score: 250,
    },
    products_serving_size: '2 tbsp',
    products_serving_quantity: 30,
    products_serving_quantity_unit: 'g',
    products_size_imported: '500g',
    product_categories: 'Snacks',
    products_food_group: 'Spreads & Condiments',
    product_keyword: 'Organic, Spread, Natural, Protein-rich',
    products_nutrient_level: {
      sugar: "low",
      "energy-kcal": 500,
      sugars: 10,
      fat: 25,
      proteins: 15,
      salt: 0.5,
      "vitamin-C": 0,
      "trans-Fat": 0,
      "saturated-Fat": 5,
      iron: 1,
      fiber: 2,
      calcium: 3,
      carbohydrates: 30,
      cholesterol: 0,

    },
  };

  transformKey(key: string): string {
    return key
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  isNumberKey(key: string, value: any): boolean {
    return key !== 'sugar' && typeof value === 'number';
  }

  grades = ['A', 'B', 'C', 'D', 'E'];

  highlights = [
    { icon: 'star-icon', title: 'Premium Quality', description: 'Made with 95% organic peanuts' },
    { icon: 'shield-icon', title: 'Certified Organic', description: 'USDA organic certified product' },
    { icon: 'award-icon', title: 'Award Winning', description: 'Best in class natural spread' },
  ];

  getGradeColor(grade: string): string {
    const colors: { [key: string]: string } = {
      A: 'bg-green-500',
      B: 'bg-green-400',
      C: 'bg-yellow-500',
      D: 'bg-orange-500',
      E: 'bg-red-500',
    };
    return colors[grade] || 'bg-gray-500';
  }
}