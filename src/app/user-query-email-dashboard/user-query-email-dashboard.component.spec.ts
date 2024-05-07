import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQueryEmailDashboardComponent } from './user-query-email-dashboard.component';

describe('UserQueryEmailDashboardComponent', () => {
  let component: UserQueryEmailDashboardComponent;
  let fixture: ComponentFixture<UserQueryEmailDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserQueryEmailDashboardComponent]
    });
    fixture = TestBed.createComponent(UserQueryEmailDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
