import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SentimentAnalysisComponent } from './sentiment-analysis/sentiment-analysis.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExamplesComponent } from './examples/examples.component';
import { SentenceSimilarityComponent } from './sentence-similarity/sentence-similarity.component';
import { NerComponent } from './ner/ner.component';
import { ChatComponent } from './chat/chat.component';
import { FaqComponent } from './faq/faq.component';
import { AdminComponent } from './admin/admin.component';
import { EmailCategorizationComponent } from './email-categorization/email-categorization.component';
import { TextSummarizationComponent } from './text-summarization/text-summarization.component';



@NgModule({
  declarations: [
    AppComponent,
    SentimentAnalysisComponent,
    ExamplesComponent,
    SentenceSimilarityComponent,
    NerComponent,
    ChatComponent,
    FaqComponent,
    AdminComponent,
    EmailCategorizationComponent,
    TextSummarizationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
