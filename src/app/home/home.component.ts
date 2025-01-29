import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LucideAngularModule, Home, Search } from 'lucide-angular';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,LucideAngularModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 isSidebarOpen = false; // Sidebar is initially hidden

  toggleSidebar(state?: boolean): void {
    if (state !== undefined) {
      this.isSidebarOpen = state; // Set to true/false explicitly
    } else {
      this.isSidebarOpen = !this.isSidebarOpen; // Toggle the current state
    }
  }
}
