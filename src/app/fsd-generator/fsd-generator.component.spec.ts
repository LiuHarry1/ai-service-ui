import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsdGeneratorComponent } from './fsd-generator.component';

describe('FsdGeneratorComponent', () => {
  let component: FsdGeneratorComponent;
  let fixture: ComponentFixture<FsdGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FsdGeneratorComponent]
    });
    fixture = TestBed.createComponent(FsdGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
