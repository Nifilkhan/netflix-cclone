import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { AllMovies } from '../../../shared/models/movie-model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../../shared/services/movie.service';
import { GetDetailsService } from '../../../shared/services/get-details.service';
import { NoMovieComponent } from "../../../pages/no-movie/no-movie.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterLink, NoMovieComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  constructor(private route:ActivatedRoute, private service:MovieService,private details:GetDetailsService) { }

  query: string = '';
 @Input() searchMovies: AllMovies[] = [];


 ngOnInit(): void {
  this.queryParamsChange();
}


queryParamsChange() {
  this.route.queryParams.subscribe(params => {
    this.query = params['q'];
      this.searchMoviesByQuery(this.query);

  })
}

searchMoviesByQuery(query: string) {
  if (query && query.trim()) {
    this.service.searchMovies(query).subscribe(
      (data) => {
        this.searchMovies = data.results; // Update the search results
        console.log(data);
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }
}

loadDetails(id: number | null):void {
  if(!id) {
    return
  }
  this.details.viewMovieDetails(id)
  console.log(id)
}
}
