import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesComponent } from './examples/examples.component';
import { SentimentAnalysisComponent } from './sentiment-analysis/sentiment-analysis.component';
import {SentenceSimilarityComponent} from "./sentence-similarity/sentence-similarity.component";
import {NerComponent} from "./ner/ner.component";
import {ChatComponent} from "./chat/chat.component";
import {FaqComponent} from "./faq/faq.component";

const routes: Routes = [
  { path: 'examples', component: ExamplesComponent },
/*  { path: 'examples/:id', component: SentimentAnalysisComponent },*/
  { path: 'sentiment-analysis', component: SentimentAnalysisComponent },
  { path: 'sentence-similarity', component: SentenceSimilarityComponent },
  { path: 'ner', component: NerComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'faq', component: FaqComponent },
  { path: '', redirectTo: '/examples', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

