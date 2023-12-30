import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsIssueEmailSearcherComponent } from './ps-issue-email-searcher.component';

describe('PsIssueEmailSearcherComponent', () => {
  let component: PsIssueEmailSearcherComponent;
  let fixture: ComponentFixture<PsIssueEmailSearcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PsIssueEmailSearcherComponent]
    });
    fixture = TestBed.createComponent(PsIssueEmailSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
