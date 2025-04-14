import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsdBrowserComponent } from './fsd-browser.component';

describe('FsdBrowserComponent', () => {
  let component: FsdBrowserComponent;
  let fixture: ComponentFixture<FsdBrowserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FsdBrowserComponent]
    });
    fixture = TestBed.createComponent(FsdBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
