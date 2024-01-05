import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSearcherComponent } from './email-searcher.component';

describe('EmailSearcherComponent', () => {
  let component: EmailSearcherComponent;
  let fixture: ComponentFixture<EmailSearcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailSearcherComponent]
    });
    fixture = TestBed.createComponent(EmailSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
