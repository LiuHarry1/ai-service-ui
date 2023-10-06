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
    { title: 'Email Categorization', description: 'This is the second example.', category: 'ML' , id :'2', hovered:false , link:'/email_categorization'},
    { title: 'Sentence Similarity', description: 'This is the third example.', category: 'Sentence Similarity', id :'3' , hovered:false , link:'/sentence-similarity'},
    { title: 'FAQ', description: 'This is the four example.', category: 'ML' , id :'4', hovered:false , link:'/faq'},
    { title: 'Name Entity Recongition', description: 'This is the five example.', category: 'NER', id :'5' , hovered:false , link:'/ner'},
    { title: 'Chat Box', description: 'This is the six example.', category: 'ML' , id :'6', hovered:false , link:'/chat'},
    { title: 'Text Summarization', description: 'This is the seven example.', category: 'Text Summarization', id :'7' , hovered:false , link:'/sentiment-analysis'},
    { title: 'Traditional Machine Learning', description: 'This is the eight example.', category: 'ML' , id :'8', hovered:false , link:'/sentiment-analysis'},



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

