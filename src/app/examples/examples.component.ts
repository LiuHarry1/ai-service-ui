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
    { title: 'Sentiment Analysis', description: 'This is the first example.', category: 'NLP', id :'1', hovered:false, link:'/sentiment-analysis' },
    { title: 'Example 2', description: 'This is the second example.', category: 'Category B', id :'1' , hovered:false , link:'/sentiment-analysis'},
    { title: 'Example 3', description: 'This is the third example.', category: 'Category A', id :'1' , hovered:false , link:'/sentiment-analysis'},
    { title: 'Example 4', description: 'This is the four example.', category: 'Category A' , id :'1', hovered:false , link:'/sentiment-analysis'},
    { title: 'Example 5', description: 'This is the five example.', category: 'Category A', id :'1' , hovered:false , link:'/sentiment-analysis'},
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
