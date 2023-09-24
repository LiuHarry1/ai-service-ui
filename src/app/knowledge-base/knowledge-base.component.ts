import { Component } from '@angular/core';

interface QnA {
  answer: string;
  questions: string[];
}

@Component({
  selector: 'app-knowledge-base',
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.css']
})
export class KnowledgeBaseComponent {
  qnas: QnA[] = [
    { answer: 'Angular is a JavaScript framework...', questions: ['What is Angular?'] },
    { answer: 'To create a component...', questions: ['How do I create a component?'] },
    // Add more dummy QnA data here
  ];

  newAnswer: string = '';
  newQuestion: string = '';
  editingIndex: number = -1;
  popupQuestions: string[] = [];
  showPopup: boolean = false;
  popupEditingIndex: number = -1;

  addQnA() {
    if (this.newAnswer.trim() !== '' && this.newQuestion.trim() !== '') {
      const existingQnA = this.qnas.find(qna => qna.answer === this.newAnswer);
      if (existingQnA) {
        existingQnA.questions.push(this.newQuestion);
      } else {
        this.qnas.push({ answer: this.newAnswer, questions: [this.newQuestion] });
      }
      this.newAnswer = '';
      this.newQuestion = '';
    }
  }

  editQnA(index: number) {
    this.editingIndex = index;
    const qna = this.qnas[index];
    this.newAnswer = qna.answer;
    this.newQuestion = qna.questions[0];
  }

  showQuestionsPopup(index: number) {
    this.popupQuestions = this.qnas[index].questions;
    this.showPopup = true;
  }

  editPopupQuestion(index: number) {
    this.popupEditingIndex = index;
    this.newQuestion = this.popupQuestions[index];
  }

  addQuestionToPopup() {
    if (this.newQuestion.trim() !== '') {
      this.popupQuestions.push(this.newQuestion);
      this.newQuestion = '';
    }
  }

  updatePopupQuestion() {
    if (this.popupEditingIndex !== -1 && this.newQuestion.trim() !== '') {
      this.popupQuestions[this.popupEditingIndex] = this.newQuestion;
      this.newQuestion = '';
      this.popupEditingIndex = -1;
    }
  }

  closePopup() {
    this.popupQuestions = [];
    this.showPopup = false;
    this.popupEditingIndex = -1;
  }
  deleteQnA(index: number) {
    this.qnas.splice(index, 1);
  }

  cancelEdit() {
    this.editingIndex = -1;
    this.newAnswer = '';
    this.newQuestion = '';
  }
}
