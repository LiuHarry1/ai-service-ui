import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-common-chat',
  templateUrl: './common-chat.component.html',
  styleUrls: ['./common-chat.component.css']
})
export class CommonChatComponent {
  message: string = '';
  isSearchActive: boolean = false;
  isReasonActive: boolean = false;
  isUploadDisabled = true;  // initially disabled
  messages: { sender: 'user' | 'bot', text: string }[] = [];

  @ViewChild('chatTextarea') textarea!: ElementRef;

  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;


  userInput: string = '';

  sendMessage() {
    if (!this.userInput.trim()) {
      return;
    }

    // Add user message
    this.messages.push({ sender: 'user', text: this.userInput });

    const userMessage = this.userInput; // store for later
    this.userInput = '';

    // Simulate bot reply after 1 second
    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: `You said: "${userMessage}". Here's a bot response!`
      });
      this.scrollToBottom()
    }, 1000);
    this.scrollToBottom()
  }



  ngAfterViewInit() {
    this.adjustHeight();
  }

  adjustHeight() {
    const el = this.textarea.nativeElement;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 1.5 * 8 * 16) + 'px'; // max 8 lines
  }

  onInput() {
    this.adjustHeight();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      console.log('File selected:', file);
    }
  }

  onSearch() {
    this.isSearchActive = !this.isSearchActive;
    console.log('Search:', this.message);
  }

  onReason() {
    this.isReasonActive = !this.isReasonActive;
    console.log('Reasoning for:', this.message);
  }


  onUpload() {
    // Here you can open a file dialog or handle file upload logic
    console.log('Upload button clicked');
  }



  scrollToBottom() {


    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 0);

  }



}
