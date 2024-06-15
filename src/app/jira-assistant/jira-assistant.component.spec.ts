import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraAssistantComponent } from './jira-assistant.component';

describe('JiraAssistantComponent', () => {
  let component: JiraAssistantComponent;
  let fixture: ComponentFixture<JiraAssistantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JiraAssistantComponent]
    });
    fixture = TestBed.createComponent(JiraAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
