import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesComponent } from './examples/examples.component';
import { SentimentAnalysisComponent } from './sentiment-analysis/sentiment-analysis.component';

const routes: Routes = [
  { path: 'examples', component: ExamplesComponent },
/*  { path: 'examples/:id', component: SentimentAnalysisComponent },*/
  { path: 'sentiment-analysis', component: SentimentAnalysisComponent },
  { path: '', redirectTo: '/examples', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

