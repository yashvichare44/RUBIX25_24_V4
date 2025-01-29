import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { FoursquareService } from '../foursquare.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
  imports:[HttpClientModule]
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private userCoordinates: { lat: number; lng: number } = { lat: 0, lng: 0 };
  private markers: L.LayerGroup = L.layerGroup();

  constructor(private foursquareService: FoursquareService) {}

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    // Initialize the map
    this.map = L.map('map').setView([51.505, -0.09], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    // Get user's location
    navigator.geolocation.getCurrentPosition((position) => {
      this.userCoordinates = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      this.map.setView([this.userCoordinates.lat, this.userCoordinates.lng], 14);
      this.fetchNearbyStores();
    });
  }

  fetchNearbyStores() {
    this.foursquareService
      .getNearbyStores(this.userCoordinates.lat, this.userCoordinates.lng)
      .subscribe((response: any) => {
        this.markers.clearLayers(); // Clear existing markers
        response.results.forEach((store: any) => {
          const { latitude, longitude } = store.geocodes.main;

          // Custom marker icon using a local image
          const redIcon = L.icon({
            iconUrl: 'assets/a.png', // Path to the local image in the assets folder
            iconSize: [30, 30], // Adjust size as needed
            iconAnchor: [15, 30], // Anchor to the bottom-center of the icon
            popupAnchor: [0, -30], // Adjust popup position
          });

          const marker = L.marker([latitude, longitude], { icon: redIcon }).bindPopup(`
            <h4>${store.name}</h4>
            <p>${store.location.formatted_address || 'No address available'}</p>
          `);

          this.markers.addLayer(marker);
        });

        this.markers.addTo(this.map);
      });
  }
}
