import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextComparisonComponent } from './text-comparison.component';

describe('TextComparisonComponent', () => {
  let component: TextComparisonComponent;
  let fixture: ComponentFixture<TextComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextComparisonComponent]
    });
    fixture = TestBed.createComponent(TextComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
