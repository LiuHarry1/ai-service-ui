import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattedResultsComponent } from './formatted-results.component';

describe('FormattedResultsComponent', () => {
  let component: FormattedResultsComponent;
  let fixture: ComponentFixture<FormattedResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormattedResultsComponent]
    });
    fixture = TestBed.createComponent(FormattedResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
