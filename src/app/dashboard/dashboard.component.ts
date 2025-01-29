
import { Component, OnInit } from '@angular/core';
import { CountUp } from 'countup.js';
import { Chart, registerables } from 'chart.js'; // Import registerables
import gsap from 'gsap';
import feather from 'feather-icons'; // Import feather-icons
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
interface ProductStats {
    productCount: number;
    sums: {
      carbohydrates: number;
      calcium: number;
      quantity: number;
      energyKcal: number;
      serves: number;
      transfat: number;
      score: number;
      protein: number;
      fat: number;
      iron: number;
      cholesterol: number;
      fibre: number;
      sugar: number;
    };
  }
@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    productCount: number = 0;
    carbohydrates: number = 0;
    calcium: number = 0;
    quantity: number = 0;
    energyKcal: number = 0;
    serves: number = 0;
    transfat: number = 0;
    score: number = 0;
    protein: number = 0;
    fat: number = 0;
    iron: number = 0;
    cholesterol: number = 0;
    fibre: number = 0;
    sugar: number = 0;
  
    private baseUrl = 'http://localhost:8081/api/products';
  
    constructor(private http: HttpClient) {}
    ngOnInit(): void {
        // Register all ne
        // cessary components
    const userId = 1; // Replace this with the actual user ID
    this.fetchProductStats(userId).subscribe(
        (response: ProductStats) => {
          this.productCount = response.productCount;
          this.carbohydrates = response.sums.carbohydrates;
          this.calcium = response.sums.calcium;
          this.quantity = response.sums.quantity;
          this.energyKcal = response.sums.energyKcal;
          this.serves = response.sums.serves;
          this.transfat = response.sums.transfat;
          this.score = response.sums.score;
          this.protein = response.sums.protein;
          this.fat = response.sums.fat;
          this.iron = response.sums.iron;
          this.cholesterol = response.sums.cholesterol;
          this.fibre = response.sums.fibre;
          this.sugar = response.sums.sugar;
        },
        (error: any) => {
          console.error('Error fetching product stats:', error);
        }
      );

        Chart.register(...registerables); // Register all components
    
        // Initialize Feather Icons
        feather.replace();
    
        // Initialize CountUp instances
        this.initializeCountUp();
    
        // Initialize Charts
        this.initializeCharts();
    
        // Animate progress bars
        this.animateProgressBars();
    
        // Handle progress input
        this.setupProgressInput();
      }

  fetchProductStats(userId: number): Observable<ProductStats> {
    return this.http.get<ProductStats>(`${this.baseUrl}/${userId}/stats`);
  }
    
      private initializeCountUp(): void {
        const ignoredTickets = new CountUp('ignoredTickets', 980, {
          duration: 2.5,
          useEasing: true,
          useGrouping: true
        });
        ignoredTickets.start();
    
        const coffeeCount = new CountUp('coffeeCount', 892, {
          duration: 2.5,
          useEasing: true,
          useGrouping: true
        });
        coffeeCount.start();
    
        const serverHealth = new CountUp('serverHealth', 42, {
          duration: 2.5,
          useEasing: true,
          useGrouping: true,
          suffix: '%'
        });
        serverHealth.start();
    
        const meetingsAvoided = new CountUp('meetingsAvoided', 156, {
          duration: 2.5,
          useEasing: true,
          useGrouping: true
        });
        meetingsAvoided.start();
      }
    
      private initializeCharts(): void {
        // Line Chart for Productivity
        const productivityCanvas = document.getElementById('productivityChart') as HTMLCanvasElement;
        const productivityCtx = productivityCanvas.getContext('2d');
    
        if (productivityCtx) {
            new Chart(productivityCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [
                        {
                            label: 'fat',
                            data: [20, 35, 45, 30, 25],
                            borderColor: 'rgb(167, 139, 250)',
                            tension: 0.4
                        },
                        {
                            label: 'sugar',
                            data: [5, 8, 12, 15, 20],
                            borderColor: 'rgb(251, 191, 36)',
                            tension: 0.4
                        },
                        {
                            label: 'protein',
                            data: [100, 23, 4, 53, 22],
                            borderColor: 'rgb(2, 9, 93)',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: '#9CA3AF'
                            }
                        }
                    },
                    scales: {
                        y: {
                            grid: {
                                color: '#374151'
                            },
                            ticks: {
                                color: '#9CA3AF'
                            }
                        },
                        x: {
                            grid: {
                                color: '#374151'
                            },
                            ticks: {
                                color: '#9CA3AF'
                            }
                        }
                    }
                }
            });
        } else {
            console.error('Could not get 2D context for productivityChart');
        }
    
        // Bar Chart for Tickets
        const ticketCanvas = document.getElementById('ticketChart') as HTMLCanvasElement;
        const ticketCtx = ticketCanvas.getContext('2d');
    
        if (ticketCtx) {
          new Chart(ticketCtx, {
            type: 'bar',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
              datasets: [{
                label: 'Eco Score',
                data: [65, 59, 80, 81, 56],  ///////////////////////////// Your eco score values
                backgroundColor: 'rgb(239, 68, 68)',
              }, {
                label: 'Excuses',
                data: [100, 100, 100, 100, 100], // Excuses data         ////////////dont touch this as it is the cap level needed///////////////
                backgroundColor: 'rgb(147, 51, 234)',
              }]
            },
            options: {
              plugins: {
                legend: {
                  labels: {
                    color: '#9CA3AF'
                  }
                }
              },
              scales: {
                y: {
                  grid: {
                    color: '#374151'
                  },
                  ticks: {
                    color: '#9CA3AF'
                  }
                },
                x: {
                  grid: {
                    color: '#374151'
                  },
                  ticks: {
                    color: '#9CA3AF'
                  }
                }
              }
            }
          });
        } else {
          console.error('Could not get 2D context for ticketChart');
        }
    
        // Pie Chart
        const pieCanvas = document.getElementById('pieChart') as HTMLCanvasElement;
        const pieCtx = pieCanvas.getContext('2d');
    
        if (pieCtx) {
            new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: ['iron', 'fibre', 'calcium', 'carbohydrate', 'transfat'],
                    datasets: [{
                        label: 'Colors',
                        data: [300, 50, 100, 90, 23],            ////////////////////////////////////
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(252, 0, 0, 0.2)',
                            'rgba(47, 255, 0, 0.2)',
                            'rgba(255, 255, 0, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgb(255, 0, 0)',
                            'rgb(0, 255, 0)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: '#9CA3AF'
                            }
                        }
                    }
                }
            });
        } else {
            console.error('Could not get 2D context for pieChart');
        }
    
        // Radar Chart ```typescript
        const radarCanvas = document.getElementById('radarChart') as HTMLCanvasElement;
        const radarCtx = radarCanvas.getContext('2d');
    
        if (radarCtx) {
          new Chart(radarCtx, {
            type: 'radar',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
              datasets: [{
                label: 'Users', // Required label
                data: [100, 500, 300, 400, 500],       //////////////
                borderColor: 'rgb(167, 139, 250)',
                tension: 0.4
              }, {
                label: 'Orders',
                data: [100, 980, 3500, 400], //////////////////////////
                borderColor: 'rgb(251, 191, 36)',
                tension: 0.4
              },{
                label: 'Temps',
                data: [4500, 4500, 5000, 5000, 5000],///////////////////////////
                borderColor: 'rgb(2, 9, 93)',
                tension: 0.4
              }]
            },
            options: {
              plugins: {
                legend: {
                  labels: {
                    color: '#9CA3AF'
                  }
                }
              },
              scales: {
                r: {
                  grid: {
                    color: '#374151'
                  },
                  ticks: {
                    color: '#9CA3AF'
                  }
                }
              }
            }
          });
        } else {
          console.error('Could not get 2D context for radarChart');
        }
    
      }
    
      private animateProgressBars(): void {
        gsap.from("#ignoredProgress", {
          width: "0%",
          duration: 2,
          ease: "power2.out"
        });
    
        gsap.from("#coffeeProgress", {
          width: "0%",
          duration: 2,
          ease: "power2.out"
        });
    
        gsap.from("#serverProgress", {
     width: "0%",
          duration: 2,
          ease: "power2.out"
        });
    
        gsap.from("#meetingsProgress", {
          width: "0%",
          duration: 2,
          ease: "power2.out"
        });
      }
    
 private setupProgressInput(): void {
  const progressBarFill = document.getElementById('progress-fill') as HTMLElement; // Cast to HTMLElement
  const badges = document.querySelectorAll('.badges img') as NodeListOf<HTMLImageElement>; // Cast to NodeListOf<HTMLImageElement>

  // Use productCount instead of progressInput
  const value = Math.min(Math.max(this.productCount || 0, 0), 100);

  // Update progress bar
  progressBarFill.style.height = value + '%'; // Now TypeScript recognizes style

  // Show badges based on value
  badges.forEach((badge, index) => {
    const threshold = (index + 1) * 30;
    badge.style.display = value >= threshold ? 'block' : 'none'; // Now TypeScript recognizes style
  });
}
    }