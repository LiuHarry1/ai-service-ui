import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraGroupDetailComponent } from './jira-group-detail.component';

describe('JiraGroupDetailComponent', () => {
  let component: JiraGroupDetailComponent;
  let fixture: ComponentFixture<JiraGroupDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JiraGroupDetailComponent]
    });
    fixture = TestBed.createComponent(JiraGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
