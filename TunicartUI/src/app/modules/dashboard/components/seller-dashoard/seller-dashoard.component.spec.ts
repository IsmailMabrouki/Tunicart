import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashoardComponent } from './seller-dashoard.component';

describe('SellerDashoardComponent', () => {
  let component: SellerDashoardComponent;
  let fixture: ComponentFixture<SellerDashoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerDashoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerDashoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
