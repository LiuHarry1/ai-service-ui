import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
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
import {ButtonModule} from "primeng/button";
import {AutoCompleteModule} from "primeng/autocomplete";
import { InputTextModule } from 'primeng/inputtext';
import { FaqNewComponent } from './faq-new/faq-new.component';
import { AnomalyDetectionComponent } from './anomaly-detection/anomaly-detection.component';
import {TranslationComponent} from './translation/translation.component'
import {DropdownModule} from "primeng/dropdown";
import { EmailLabelingComponent } from './email-labeling/email-labeling.component';
import { EmailSearcherComponent } from './email-searcher/email-searcher.component';
import { EmailComponent } from './email/email.component';
import { EmailPopupComponent } from './email-popup/email-popup.component';
import {MultiSelectModule} from "primeng/multiselect";
import { TextFormatComponent } from './text-formatter/text-format/text-format.component';
import { FormattedResultsComponent } from './text-formatter/formatted-results/formatted-results.component';
import { FileContentComponent } from './text-formatter/file-content/file-content.component';
import { TextComparisonComponent } from './text-formatter/text-comparison/text-comparison.component';
import { TextFormatterComponent } from './text-formatter/text-formatter.component';
import { Llama2Component } from './llama2/llama2.component';
import { CompletionComponent } from './llama2/completion/completion.component';
import { MarkdownModule } from 'ngx-markdown';
import { UserQueryEmailDashboardComponent } from './user-query-email-dashboard/user-query-email-dashboard.component';
import {TableModule} from "primeng/table";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {SliderModule} from "primeng/slider";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OrderFoodChatbotComponent } from './order-food-chatbot/order-food-chatbot.component';
import { ChatbotComponent } from './llama2/chatbot/chatbot.component';
import { JiraAssistantComponent } from './jira-assistant/jira-assistant.component';
import {CardModule} from "primeng/card";



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
    FaqNewComponent,
    AnomalyDetectionComponent,
    TranslationComponent,
    EmailLabelingComponent,
    EmailSearcherComponent,
    EmailComponent,
    EmailPopupComponent,
    TextFormatComponent,
    FormattedResultsComponent,
    FileContentComponent,
    TextComparisonComponent,
    TextFormatterComponent,
    Llama2Component,
    CompletionComponent,
    UserQueryEmailDashboardComponent,
    OrderFoodChatbotComponent,
    ChatbotComponent,
    JiraAssistantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    AutoCompleteModule,
    DropdownModule,
    MatDialogModule,
    InputTextModule,
    MultiSelectModule,
    MarkdownModule.forRoot(),
    TableModule,
    CalendarModule,
    DialogModule,
    SliderModule,
    InputTextareaModule,
    CardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
