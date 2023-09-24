import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css']
})
export class ExamplesComponent {
  searchQuery: string = '';
  selectedCategory: string = 'All';

  examples: Example[] = [
    { title: 'Sentiment Analysis', description: 'This is the first example.', category: 'Classification', id :'1', hovered:false, link:'/sentiment-analysis' },
    { title: 'Sentence Similarity', description: 'This is the second example.', category: 'Sentence Similarity', id :'2' , hovered:false , link:'/sentence-similarity'},
    { title: 'Name Entity Recongition', description: 'This is the third example.', category: 'NER', id :'3' , hovered:false , link:'/ner'},
    { title: 'Text Summarization', description: 'This is the four example.', category: 'Text Summarization', id :'4' , hovered:false , link:'/sentiment-analysis'},
    { title: 'Traditional Machine Learning', description: 'This is the five example.', category: 'ML' , id :'5', hovered:false , link:'/sentiment-analysis'},
    { title: 'Chat', description: 'This is the six example.', category: 'ML' , id :'6', hovered:false , link:'/chat'},

    // Add more examples with categories as needed
  ];

  addHoverClass(example: any) {
    example.hovered = true;
  }

  removeHoverClass(example: any) {
    example.hovered = false;
  }

  navigateToSentimentAnalysis(example: any) {
    // this.router.navigate(['/sentiment-analysis']);
    this.router.navigate([example.link]);
  }


  categories: string[] = [];

  constructor(private router: Router) {
    this.categories = this.getUniqueCategories();

  }

  getUniqueCategories(): string[] {
    const uniqueCategories = new Set<string>();
    this.examples.forEach(example => uniqueCategories.add(example.category));
    return Array.from(uniqueCategories);
  }

  get filteredExamples(): Example[] {
    if (this.searchQuery.trim() === '' && this.selectedCategory === 'All') {
      return this.examples;
    }

    const lowerCaseQuery = this.searchQuery.toLowerCase();
    return this.examples.filter(example =>
      (example.title.toLowerCase().includes(lowerCaseQuery) ||
        example.description.toLowerCase().includes(lowerCaseQuery)) &&
      (this.selectedCategory === 'All' || example.category === this.selectedCategory)
    );
  }

  filterExamplesByCategory(): void {
    this.searchQuery = '';
  }
}

interface Example {
  title: string;
  description: string;
  category: string;
  id : string
  hovered: boolean; // 添加 hovered 属性

  link : string
}

