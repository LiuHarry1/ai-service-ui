import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraUsercaseComponent } from './jira-usercase.component';

describe('JiraUsercaseComponent', () => {
  let component: JiraUsercaseComponent;
  let fixture: ComponentFixture<JiraUsercaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JiraUsercaseComponent]
    });
    fixture = TestBed.createComponent(JiraUsercaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
