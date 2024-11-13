import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { AllMovies, Geners } from '../../shared/models/movie-model';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from "../../shared/components/movie-details/movie-details.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SearchComponent } from "../../core/components/search/search.component";
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComponent,
    MovieCarouselComponent,
    CommonModule,
    MovieDetailsComponent,
    RouterOutlet,
    SearchComponent
],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export class BrowseComponent implements OnInit {
  constructor(private movieService: MovieService ,private route:ActivatedRoute ) {}

  allMovies: AllMovies[] = [];
  popularMovies: AllMovies[] = [];
  topRatedMovies: AllMovies[] = [];
  geners: Geners[] = [];
  moviesByGenre: { [key: string]: AllMovies[] } = {};
  page: number = 1;
  banner! : Observable<any>;
  video!: Observable<any>
  // bannerOverview$ = new Observable<any>();

  
  ngOnInit(): void {
    this.getAllMovies();
    this.getPopularMovies();
    this.getGeners();
    this.getTopMovies();
  }

  private getAllMovies() {
    this.banner = this.movieService.getMovies(this.page).pipe(map((res) => res.results[1]));
    // this.video = this.movieService.getMovieVideo(this.page).pipe(map((res) => res.results[1]));
    this.movieService.getMovies(this.page).subscribe((res) => {
      // console.log('list of movies', res);
      this.allMovies =res.results; 
      this.page++;
      this.mapGeners();
    });
  }

  private getPopularMovies() {
    this.movieService.getPopularMovies(this.page).subscribe((res) => {
      // console.log('list of popular movies', res);
      this.popularMovies = res.results;
      this.page++;
      this.mapGeners();
    });
  }

  private getTopMovies() {
    this.movieService.getTopRatedMovies(this.page).subscribe((res) => {
      this.topRatedMovies = res.results;
      this.page++;
      this.mapGeners();
    });
  }


  private getGeners() {
    this.movieService.getGenres().subscribe((res) => {
      // console.log('list of genres', res);
      this.geners = res.genres;
      this.mapGeners();
    });
  }

  private mapGeners(): void {
    if (this.allMovies.length && this.geners.length) {
      this.geners.forEach((gener) => {
        this.moviesByGenre[gener.name] = this.allMovies
        .filter((movie) =>movie.genre_ids.includes(gener.id)
        );
      });
    }
  }

  onLoadMoreMovies() {
    this.getAllMovies();
  }


}
