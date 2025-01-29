import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoShopperComponent } from './eco-shopper.component';

describe('EcoShopperComponent', () => {
  let component: EcoShopperComponent;
  let fixture: ComponentFixture<EcoShopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcoShopperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcoShopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
