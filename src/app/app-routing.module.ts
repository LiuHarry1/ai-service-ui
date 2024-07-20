import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesComponent } from './examples/examples.component';
import { SentimentAnalysisComponent } from './sentiment-analysis/sentiment-analysis.component';
import {SentenceSimilarityComponent} from "./sentence-similarity/sentence-similarity.component";
import {NerComponent} from "./ner/ner.component";
import {ChatComponent} from "./chat/chat.component";
import {FaqComponent} from "./faq/faq.component";
import {FaqNewComponent} from "./faq-new/faq-new.component";

import {AdminComponent} from "./admin/admin.component";
import {EmailCategorizationComponent} from "./email-categorization/email-categorization.component";
import {TextSummarizationComponent} from "./text-summarization/text-summarization.component";
import {AnomalyDetectionComponent} from "./anomaly-detection/anomaly-detection.component";
import {TranslationComponent} from "./translation/translation.component";
import {EmailLabelingComponent} from "./email-labeling/email-labeling.component";
import {EmailSearcherComponent} from "./email-searcher/email-searcher.component"
import {EmailComponent} from "./email/email.component";
import {TextFormatComponent} from "./text-formatter/text-format/text-format.component";
import {FormattedResultsComponent} from "./text-formatter/formatted-results/formatted-results.component";
import {FileContentComponent} from "./text-formatter/file-content/file-content.component";
import {TextComparisonComponent} from "./text-formatter/text-comparison/text-comparison.component";
import {TextFormatterComponent} from "./text-formatter/text-formatter.component";
import {Llama2Component} from "./llama2/llama2.component";
import {CompletionComponent} from "./llama2/completion/completion.component";
import {UserQueryEmailDashboardComponent} from "./user-query-email-dashboard/user-query-email-dashboard.component";
import {OrderFoodChatbotComponent} from "./order-food-chatbot/order-food-chatbot.component";
import {ChatbotComponent} from "./llama2/chatbot/chatbot.component";
import {JiraAssistantComponent} from "./jira-assistant/jira-assistant.component";
import {FunctionCallingRobotComponent} from "./function-calling-robot/function-calling-robot.component";
import {ExceptionSolverComponent} from "./exception-solver/exception-solver.component";

const routes: Routes = [
  { path: 'examples', component: ExamplesComponent },
/*  { path: 'examples/:id', component: SentimentAnalysisComponent },*/
  { path: 'sentiment-analysis', component: SentimentAnalysisComponent },
  { path: 'sentence-similarity', component: SentenceSimilarityComponent },
  { path: 'ner', component: NerComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'faq-new', component: FaqNewComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'email_categorization', component: EmailCategorizationComponent },
  { path: 'summarize', component: TextSummarizationComponent },
  { path: 'anomaly-detection', component: AnomalyDetectionComponent },
  { path: 'translation', component: TranslationComponent },
  { path: 'email_labeling', component: EmailLabelingComponent },
  { path: 'email-searcher', component: EmailSearcherComponent },
  { path: 'email', component: EmailComponent },
  // { path: 'text-format', component: TextFormatComponent },
  // { path: 'formatted-results', component: FormattedResultsComponent },
  { path: 'file-content/:filename', component: FileContentComponent }, // Define route for file content
  // {path : 'text-comparison', component: TextComparisonComponent},
  { path: 'user-email-dashboard', component: UserQueryEmailDashboardComponent },
  {path: 'order-food-chatbot', component: OrderFoodChatbotComponent},
  { path: 'jira-assistant', component: JiraAssistantComponent },
  {path: 'function-calling-robot', component: FunctionCallingRobotComponent},
  {path: 'exception-solver', component: ExceptionSolverComponent},

  {path : 'text-formatter', component: TextFormatterComponent,
  children:[
    { path: '', redirectTo: 'text-format', pathMatch: 'full' },
    { path: 'text-format', component: TextFormatComponent },
    { path: 'formatted-results', component: FormattedResultsComponent },
    {path : 'text-comparison/:filename', component: TextComparisonComponent},


  ]},

  {path: 'llama2', component: Llama2Component, children:[
      { path: '', redirectTo: 'completion', pathMatch: 'full' },
      { path: 'completion', component: CompletionComponent },
      { path: 'chatbot', component: ChatbotComponent },
    ]},

  { path: '', redirectTo: '/examples', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

