import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionCallingRobotComponent } from './function-calling-robot.component';

describe('ChatbotComponent', () => {
  let component: FunctionCallingRobotComponent;
  let fixture: ComponentFixture<FunctionCallingRobotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionCallingRobotComponent]
    });
    fixture = TestBed.createComponent(FunctionCallingRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
