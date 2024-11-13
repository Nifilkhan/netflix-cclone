import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../../shared/services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { AllMovies } from '../../../shared/models/movie-model';
import { GetDetailsService } from '../../../shared/services/get-details.service';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let testActivatedRoute: ActivatedRoute;
  let service: MovieService;
  let detailService: GetDetailsService;
  const mockId = { id: 12345 };
  const mockObject: { results: AllMovies[] } = {
    results: [
      {
        adult: false,
        backdrop_path: '',
        id: 1223424,
        original_language: '',
        original_title: '',
        overview: '',
        poster_path: '',
        title: '',
        genre_ids: [],
        popularity: 0,
        release_date: '',
        video: false,
        vote_average: 0,
        vote_count: 0,
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, RouterModule.forRoot([]), HttpClientModule],
    }).compileComponents();

    service = TestBed.inject(MovieService);
    detailService = TestBed.inject(GetDetailsService);
    testActivatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return void if i give null as argument', () => {
    expect(component.searchMoviesByQuery('')).toBeFalsy();
  });

  it('should return void if i give empty space as argument', () => {
    expect(component.searchMoviesByQuery(' ')).toBeFalsy();
  });

  it('should set searchMovies with data', async () => {
    jest.spyOn(service, 'searchMovies').mockReturnValue(of(mockObject));

    await component.searchMoviesByQuery('asasaa');

    expect(component.searchMovies).toEqual(mockObject.results);
  });

  it('should handle null response from searchMovies service', () => {
    jest.spyOn(service, 'searchMovies').mockReturnValue(of({ results: [] }));

    component.searchMoviesByQuery('[]');

    expect(component.searchMovies).toEqual([]);
  });

  it('should contain id for load the movie details', async () => {
    const movieDetailsSpy = jest.spyOn(detailService, 'viewMovieDetails');
    await component.loadDetails(mockId.id);

    expect(movieDetailsSpy).toHaveBeenCalledWith(mockId.id);
  });

  it('should not call viewMovieDetails when ID is empty', () => {
    const spyService = jest.spyOn(detailService, 'viewMovieDetails');

    // Call loadDetails with an empty ID
    component.loadDetails(null);

    // Assert that viewMovieDetails was not called
    expect(spyService).not.toHaveBeenCalled();
  });
});
