import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqNewComponent } from './faq-new.component';

describe('FaqNewComponent', () => {
  let component: FaqNewComponent;
  let fixture: ComponentFixture<FaqNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqNewComponent]
    });
    fixture = TestBed.createComponent(FaqNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
