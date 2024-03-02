import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-text-formatter',
  templateUrl: './text-formatter.component.html',
  styleUrls: ['./text-formatter.component.css']
})
export class TextFormatterComponent {
  constructor(private router: Router) {}


}
