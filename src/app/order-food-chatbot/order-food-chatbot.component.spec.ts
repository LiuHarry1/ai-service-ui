import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFoodChatbotComponent } from './order-food-chatbot.component';

describe('OrderFoodChatbotComponent', () => {
  let component: OrderFoodChatbotComponent;
  let fixture: ComponentFixture<OrderFoodChatbotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderFoodChatbotComponent]
    });
    fixture = TestBed.createComponent(OrderFoodChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
