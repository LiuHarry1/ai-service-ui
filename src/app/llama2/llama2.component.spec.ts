import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Llama2Component } from './llama2.component';

describe('Llama2Component', () => {
  let component: Llama2Component;
  let fixture: ComponentFixture<Llama2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Llama2Component]
    });
    fixture = TestBed.createComponent(Llama2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
