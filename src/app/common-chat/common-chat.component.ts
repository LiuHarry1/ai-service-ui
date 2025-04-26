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
  messages: string[] = []; // ✨ added

  @ViewChild('chatTextarea') textarea!: ElementRef;


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

  onSend() {
    if (this.message.trim()) {
      this.messages.push(this.message.trim()); // ✨ add to chat messages
    }
    this.message = '';
    this.isSearchActive = false;
    this.isReasonActive = false;
    setTimeout(() => this.scrollToBottom(), 100); // after new message
  }

  scrollToBottom() {
    const container = document.querySelector('.chat-messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }


}
