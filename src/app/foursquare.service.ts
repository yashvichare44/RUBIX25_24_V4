import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoursquareService {
  private apiUrl = 'https://api.foursquare.com/v3/places/search';
  private apiKey = 'fsq38uMBtWY/Xe/ht4gTLtKBV8aGn0D/th1Cn3itUyXb2YY='; // Replace with your API Key

  constructor(private http: HttpClient) {}

  getNearbyStores(lat: number, lng: number, radius: number = 10000): Observable<any> {
    const headers = {
      Authorization: this.apiKey,
    };
    const params = {
      ll: `${lat},${lng}`, // Latitude, Longitude
      radius: radius.toString(), // Radius in meters
      query: 'zero waste, refill station, ethical marketplace,ayurveda, homeopathy, meditation', // Refined keywords
      categories: '18008,17021,18011,17069,17083,17088,18001,18015,18016,18009,17023,17024,17022', // Specific categories
      limit: '50', // Limit the results
    };

    return this.http.get(this.apiUrl, { headers, params });
  }
}
