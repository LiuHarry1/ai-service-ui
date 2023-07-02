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
import { NerService } from './ner/ner.service';



@NgModule({
  declarations: [
    AppComponent,
    SentimentAnalysisComponent,
    ExamplesComponent,
    SentenceSimilarityComponent,
    NerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [NerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
