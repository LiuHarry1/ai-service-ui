import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceSimilarityComponent } from './sentence-similarity.component';

describe('SimilarityComponent', () => {
  let component: SentenceSimilarityComponent;
  let fixture: ComponentFixture<SentenceSimilarityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SentenceSimilarityComponent]
    });
    fixture = TestBed.createComponent(SentenceSimilarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
