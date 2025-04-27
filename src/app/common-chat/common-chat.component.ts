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
  isBotTyping = false;
  botTypingTimeout: any;

  jiraGroups = [
    { name: 'Group A', ids: ['JIRA-1001', 'JIRA-1002', 'JIRA-1003'] },
    { name: 'Group B', ids: ['JIRA-2001', 'JIRA-2002'] },
    { name: 'Group C', ids: ['JIRA-3001'] }
  ];

  selectedJiraGroup: string = this.jiraGroups[0].name;
  jiraIds: string[] = this.jiraGroups[0].ids;

  @ViewChild('chatTextarea') textarea!: ElementRef;

  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;



  userInput: string = '';

  isRightPanelOpen = false;

  openRightPanel() {
    this.isRightPanelOpen = true;
  }

  closeRightPanel() {
    this.isRightPanelOpen = false;
  }

  onSearch() {
    this.isSearchActive = !this.isSearchActive;
    if (this.isSearchActive) {
      // Initialize dropdown when panel opens
      this.selectedJiraGroup = this.jiraGroups[0].name;
      this.jiraIds = this.jiraGroups[0].ids;
    }
  }


  // When user changes Jira group dropdown
  onJiraGroupChange() {
    const group = this.jiraGroups.find(g => g.name === this.selectedJiraGroup);
    this.jiraIds = group ? group.ids : [];
  }

  // When user clicks a Jira ID from list
  onJiraIdSelected(jiraId: string) {
    // You can add logic here to append context or details for that ID to the chat
    this.messages.push({
      sender: 'bot',
      text: `Context for ${jiraId}: ... (load real data here)`
    });

    // Optional: Scroll chat to bottom
    this.scrollToBottom();
  }


  sendMessage() {
    if (!this.userInput.trim()) {
      return;
    }

    // If bot is typing, interrupt
    if (this.isBotTyping) {
      return
    }


    // Add user message
    this.messages.push({ sender: 'user', text: this.userInput });

    const userMessage = this.userInput; // store for later
    this.userInput = '';

    this.adjustHeight();// Reset textarea height
    this.focusTextarea(); // ✨ Focus back after sending
    this.scrollToBottom()

    this.isBotTyping = true;

    // Simulate bot reply after 1 second
    this.botTypingTimeout =setTimeout(() => {
      this.isBotTyping = false; // stop typing when bot replies
      this.messages.push({
        sender: 'bot',
        text: `You said: "${userMessage}". Here's a bot response!`
      });
      this.scrollToBottom()
    }, 1000);

  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // prevent newline
      this.sendMessage(); // send the message
    }
  }

  ngAfterViewInit() {
    this.adjustHeight();
    this.focusTextarea(); // ✨ Auto focus when first enter page
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



  onReason() {
    this.isReasonActive = !this.isReasonActive;
    console.log('Reasoning for:', this.message);
  }


  onUpload() {
    // Here you can open a file dialog or handle file upload logic
    console.log('Upload button clicked');
  }

  focusTextarea() {
    setTimeout(() => {
      this.textarea?.nativeElement?.focus();
    }, 0);
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
