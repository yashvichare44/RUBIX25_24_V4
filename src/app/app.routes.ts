import {  Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PostPageComponent } from './post-page/post-page.component';
import { MapComponent } from './map/map.component';
import { EcoShopComponent } from './eco-shop/eco-shop.component';
import { EcoShopperComponent } from './eco-shopper/eco-shopper.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


// Export the 'routes' so it can be imported elsewhere
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect default route to login
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }, // Login page
  { path: 'register', component: RegisterComponent }, // Register page
  { path: 'dashboard', component: DashboardComponent }, // Dashboard after login
  { path: 'shop', component: EcoShopComponent },
  { path: 'search', component: EcoShopperComponent },
  { path: 'maps', component: MapComponent },
  { path: 'posts', component: PostPageComponent },
  { path: 'product', component: ProductDetailsComponent },
  { path: 'recommendations', component: RecommendationComponent },
];