import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoShopComponent } from './eco-shop.component';

describe('EcoShopComponent', () => {
  let component: EcoShopComponent;
  let fixture: ComponentFixture<EcoShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcoShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcoShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
