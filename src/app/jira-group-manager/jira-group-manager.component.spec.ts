import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraGroupManagerComponent } from './jira-group-manager.component';

describe('JiraGroupManagerComponent', () => {
  let component: JiraGroupManagerComponent;
  let fixture: ComponentFixture<JiraGroupManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JiraGroupManagerComponent]
    });
    fixture = TestBed.createComponent(JiraGroupManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
