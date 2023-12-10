import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLabelingComponent } from './email-labeling.component';

describe('EmailLabelingComponent', () => {
  let component: EmailLabelingComponent;
  let fixture: ComponentFixture<EmailLabelingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailLabelingComponent]
    });
    fixture = TestBed.createComponent(EmailLabelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
