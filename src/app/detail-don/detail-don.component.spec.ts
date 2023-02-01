import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDonComponent } from './detail-don.component';

describe('DetailDonComponent', () => {
  let component: DetailDonComponent;
  let fixture: ComponentFixture<DetailDonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
