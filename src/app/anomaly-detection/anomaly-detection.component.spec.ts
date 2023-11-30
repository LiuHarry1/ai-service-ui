import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalyDetectionComponent } from './anomaly-detection.component';

describe('AbnormalyDetectionComponent', () => {
  let component: AnomalyDetectionComponent;
  let fixture: ComponentFixture<AnomalyDetectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnomalyDetectionComponent]
    });
    fixture = TestBed.createComponent(AnomalyDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
