import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFormatterComponent } from './text-formatter.component';

describe('TextFormatterComponent', () => {
  let component: TextFormatterComponent;
  let fixture: ComponentFixture<TextFormatterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextFormatterComponent]
    });
    fixture = TestBed.createComponent(TextFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
