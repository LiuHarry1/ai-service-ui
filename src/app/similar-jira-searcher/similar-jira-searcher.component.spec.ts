import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarJiraSearcherComponent } from './similar-jira-searcher.component';

describe('SimilarJiraSearcherComponent', () => {
  let component: SimilarJiraSearcherComponent;
  let fixture: ComponentFixture<SimilarJiraSearcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimilarJiraSearcherComponent]
    });
    fixture = TestBed.createComponent(SimilarJiraSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
