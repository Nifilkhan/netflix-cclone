import {
  Component,
  OnInit,
} from '@angular/core';
import { HeaderComponent } from '../../../core/components/header/header.component';
import {
  AllMovies,
  movieDetailsResponse,
  VideoResponse,
} from '../../models/movie-model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../../shared/services/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GetDetailsService } from '../../services/get-details.service';
import { CarouselModule } from 'primeng/carousel';
import { ImagePipe } from '../../pipes/image-pipe.pipe';
import { Observable } from 'rxjs';
import { LoadingSpinnerComponent } from "../../../pages/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterLink, CarouselModule, ImagePipe, LoadingSpinnerComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movieDetails: movieDetailsResponse | null = null;
  trailerUrl: SafeResourceUrl | null = null;
  videos: VideoResponse[] = [];
  similarMovies: AllMovies[] = [];
  selectedMovie: any;
  bannerDetails$ = new Observable<any>();
  loading:boolean = true;


  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitiser: DomSanitizer,
    private movieDetail: GetDetailsService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const movieId = params['id'];
      if (movieId) {
        this.detailsMovie(movieId)
      }
    });
  }

  public detailsMovie(movieId: number) {
    this.loading = true;
    this.movieService.getMovieDetails(movieId).subscribe({
      next: (res) => {
        this.movieDetails = res;
        this.loadSimilarMovies(movieId);
        this.getMovieVideos(movieId);
        this.loading = false; // Set loading to false on success
      },
      error: () => {
        // console.error('Error fetching movie details:', err);
        this.loading = false; // Set loading to false on error
      }
    });
  }
  

  public loadSimilarMovies(movieId: number) {
    this.movieService.getSimilarMovies(movieId).subscribe((res) => {
      this.similarMovies = res.results;
      console.log('similar movies:', this.similarMovies);
      // this.checkLoading()
    });
  }

  public getMovieVideos(movieId: number) {
    this.movieService.getMovieVideo(movieId).subscribe((res) => {
      console.log('movie video:', res);
      this.videos = res.results;
      // console.log('movie video', this.videos);

      //   this.videos.forEach(video => {
      //     console.log(`Video Type: ${video.type}, Site: ${video.site}`);
      // });

      const trailer = this.videos.find(
        (video) =>
          video.type.toLocaleLowerCase() === 'trailer' &&
          video.site.toLocaleLowerCase() === 'youtube'
      );

      // console.log('Trailer:', trailer);

      if (trailer) {
        this.trailerUrl = this.sanitiser.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${trailer.key}`
        );
      } else {
        console.log('No trailer found');
        this.trailerUrl = null;
      }
      this.loading = false;
    });
  }


  getGenreNames(): string {
    return (
      this.movieDetails?.genres.map((genre: any) => genre.name).join(', ') || ''
    );
  }

  relatedMovie(id: number) {
    this.movieDetail.viewMovieDetails(id);
  }


}
