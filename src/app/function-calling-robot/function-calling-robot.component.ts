import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {prompt_engineering_host} from "../app-config";

@Component({
  selector: 'app-chatbot',
  templateUrl: './function-calling-robot.component.html',
  styleUrls: ['./function-calling-robot.component.css']
})
export class FunctionCallingRobotComponent {
  @ViewChild('chatArea') private chatArea!: ElementRef;
  userMessage: string = '';
  chatMessages: any[] = [];
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {


  }

  ngOnInit() {
    this.chatMessages.push({ text: 'Hi, I am chatbot.', type: 'bot' });

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

    this.http.post<any>(prompt_engineering_host+'/function-calling-robot', {conversation: this.chatMessages}).subscribe(response => {
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

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // Allow new line
        return;
      } else {
        // Prevent the default behavior of Enter key to avoid adding a new line
        event.preventDefault();
        this.sendMessage();
      }
    }
  }


}
