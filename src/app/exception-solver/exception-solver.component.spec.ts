import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionSolverComponent } from './exception-solver.component';

describe('ExceptionSolverComponent', () => {
  let component: ExceptionSolverComponent;
  let fixture: ComponentFixture<ExceptionSolverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExceptionSolverComponent]
    });
    fixture = TestBed.createComponent(ExceptionSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
