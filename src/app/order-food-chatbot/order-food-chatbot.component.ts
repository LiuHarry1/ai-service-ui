import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {prompt_engineering_host} from "../app-config";

@Component({
  selector: 'app-order-food-chatbot',
  templateUrl: './order-food-chatbot.component.html',
  styleUrls: ['./order-food-chatbot.component.css']
})
export class OrderFoodChatbotComponent {
  @ViewChild('chatArea') private chatArea!: ElementRef;
  userMessage: string = '';
  last_prompt: string = ''
  chatMessages: any[] = [];
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {


  }

  ngOnInit() {
    this.chatMessages.push({ text: 'Welcome to Pizza Palace! I\'m OrderBot, here to help you with your order. What can I get for you today?', type: 'bot' });

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onSuggestionClick(suggestion: string) {
    this.userMessage = suggestion;
  }

  sendMessage() {
    if (this.userMessage === undefined || this.userMessage.trim() === ''){
      return;
    }
    this.isLoading = true
    this.chatMessages.push({ text: this.userMessage, type: 'user' });

    this.http.post<any>(prompt_engineering_host+'/order-food-support', { user_message: this.userMessage, last_prompt: this.last_prompt,
    conversation: this.chatMessages}).subscribe(response => {
      this.chatMessages.push({ text: response.bot_response, type: 'bot' });
      this.userMessage = '';
      this.isLoading = false
    });
  }

  scrollToBottom() {
    try {
      this.chatArea.nativeElement.scrollTop = this.chatArea.nativeElement.scrollHeight;
    } catch (err) {}
  }

  onThumbsUpClick(message: any) {
    console.log('Thumbs up clicked for the bot message: ', message.text);
  }

  onThumbsDownClick(message: any) {
    console.log('Thumbs down clicked for the bot message: ', message.text);
  }


}
