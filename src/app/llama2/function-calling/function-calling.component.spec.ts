import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionCallingComponent } from './function-calling.component';

describe('ChatbotComponent', () => {
  let component: FunctionCallingComponent;
  let fixture: ComponentFixture<FunctionCallingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionCallingComponent]
    });
    fixture = TestBed.createComponent(FunctionCallingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
