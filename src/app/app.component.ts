import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowseComponent } from "./pages/browse/browse.component";
import { HeaderComponent } from "./core/components/header/header.component";
import { AllMovies } from './shared/models/movie-model';
import { SearchComponent } from "./core/components/search/search.component";
import { CommonModule } from '@angular/common';
import { PreloadingStrategyService } from './shared/services/preloading-strategy.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BrowseComponent, HeaderComponent, SearchComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {

  constructor(private preloadService:PreloadingStrategyService){}

  searchResults: AllMovies[] = [];

  preloadRoutes: string [] = [];


  handleSearchResults(results: AllMovies[]) {
    console.log(' handle search results', results);
    this.searchResults = results;
    console.log(' handle search results', this.searchResults);
  }
  
}
