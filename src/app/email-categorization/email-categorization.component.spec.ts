import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCategorizationComponent } from './email-categorization.component';

describe('EmailCategorizationComponent', () => {
  let component: EmailCategorizationComponent;
  let fixture: ComponentFixture<EmailCategorizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailCategorizationComponent]
    });
    fixture = TestBed.createComponent(EmailCategorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
