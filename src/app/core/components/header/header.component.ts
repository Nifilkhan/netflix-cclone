import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(public router:Router) {}

  query: string = '';
  private setTimeout: any;
  @Output() searchResults= new EventEmitter<any[]>();

  navList = ['home', 'Tv Shows', 'News & Popular', 'My List'];


  backPage () {
    this.router.navigate(['/home'])
  }

  
  onQueryChange() {
    if (this.setTimeout) {
      clearTimeout(this.setTimeout);
    }

    this.setTimeout = setTimeout(() => {
      // console.log(this.query,'value');
      this.onSearch()      
    },800);
  }

  onSearch() {
      if (this.query.trim()) {
            this.router.navigate(['/search'], { queryParams: { q: this.query } });
      }
  }
}
