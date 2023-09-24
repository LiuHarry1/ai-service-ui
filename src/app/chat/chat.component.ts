import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked, OnInit {
  @ViewChild('chatArea') private chatArea!: ElementRef;
  userMessage: string = '';
  chatMessages: any[] = [];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.sanitizeMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  sendMessage() {
    if (this.userMessage.trim() === '') {
      return;
    }

    this.chatMessages.push({ text: this.userMessage, type: 'user' });

    this.http.post<any>('http://localhost:2020/api/chat', { user_message: this.userMessage }).subscribe(response => {
      this.chatMessages.push({ text: response.bot_response, type: 'bot' });
      this.userMessage = '';
    });
  }

  scrollToBottom() {
    try {
      this.chatArea.nativeElement.scrollTop = this.chatArea.nativeElement.scrollHeight;
    } catch (err) {}
  }

  // Sanitize messages with HTML content
  sanitizeMessages() {
    for (let message of this.chatMessages) {
      if (message.type === 'bot') {
        message.text = this.sanitizer.bypassSecurityTrustHtml(message.text);
      }
    }
  }
}
