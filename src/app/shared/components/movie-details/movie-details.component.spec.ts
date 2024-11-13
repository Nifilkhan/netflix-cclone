import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../../../shared/services/movie.service';
import { GetDetailsService } from '../../services/get-details.service';
import { of, throwError } from 'rxjs';
import { AllMovies, VideoResponse } from '../../models/movie-model';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let movies: MovieService;
  let movieDetails: GetDetailsService;
  const mockMovieId = 519820;
  const mockMovieVideoResponeSpy = {
    results: [
      {
        id: 'dummyId',
        iso_639_1: 'en',
        iso_3166_1: 'US',
        key: 'dummyKey',
        name: 'Dummy Video',
        official: false,
        published_at: '2024-01-01T00:00:00.000Z',
        site: 'YouTube',
        size: 2160,
        type: 'Clip' 
      }
    ]
  };

  const mockMovieDetails = {
    adult: false,
    backdrop_path: "",
    belongs_to_collection: {
      id: 86066,
      name: "",
      poster_path: "",
      backdrop_path: ""
    },
    budget: 100000000,
    genres: [
      { id: 16, name: "" },
      { id: 10751, name: "" },
      { id: 35, name: "" },
      { id: 28, name: "" }
    ],
    homepage: "",
    id: 519182,
    imdb_id: "",
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 1471.132,
    poster_path: "",
    production_companies: [
      { id: 33, logo_path: "", name: "", origin_country: "" },
      { id: 6704, logo_path: "", name: "", origin_country: "" }
    ],
    release_date: "",
    revenue: 953140610,
    runtime: 94,
    spoken_languages: [{ english_name: "", iso_639_1: "", name: "" }],
    status: "",
    tagline: "",
    title: "",
    vote_average: 7.113,
    vote_count: 2102
  };  


  const mockSimilarMoviesResponse = {
    results: [
      {
        adult: false,
        backdrop_path: "/wW7Wt5bXzPy4VOEE4LTIUDyDgBo.jpg",
        genre_ids: [12, 14, 28],
        id: 22,
        original_language: "en",
        original_title: "Pirates of the Caribbean: The Curse of the Black Pearl",
        overview: "After Port Royal is attacked...",
        popularity: 151.3,
        poster_path: "/poHwCZeWzJCShH7tOjg8RIoyjcw.jpg",
        release_date: "2003-07-09",
        title: "Pirates of the Caribbean: The Curse of the Black Pearl",
        video: false,
        vote_average: 7.806,
        vote_count: 20513,
      },
    ],
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent,RouterModule.forRoot([]),HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    movies = TestBed.inject(MovieService);
    movieDetails = TestBed.inject(GetDetailsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovieDetails with the correct movie ID', async() => {
    const getMovieDetailsSpy = jest.spyOn(movies, 'getMovieDetails').mockReturnValue(of(mockMovieDetails));

    await component.detailsMovie(mockMovieId);

    expect(getMovieDetailsSpy).toHaveBeenCalledWith(mockMovieId);
  });

  it('should set the movieDetails property with the response from getMovieDetails' ,async() => {
    jest.spyOn(movies,'getMovieDetails').mockReturnValue(of(mockMovieDetails));

    await component.detailsMovie(mockMovieId);

    expect(component.movieDetails).toEqual(mockMovieDetails);
  })

  it('should call the similar movies with the correct MovieId after setting movieDetails' , async () => {
    await jest.spyOn(movies,'getMovieDetails').mockReturnValue(of(mockMovieDetails))

    const loadSimilarMovieSpy = jest.spyOn(component,'loadSimilarMovies');

    component.detailsMovie(mockMovieId);

    expect(loadSimilarMovieSpy).toHaveBeenCalledWith(mockMovieId);
  })

  it('should call getMovieVideos with the correct movie ID after setting movieDetails', () => {
    jest.spyOn(movies,'getMovieDetails').mockReturnValue(of(mockMovieDetails));

    const getMovieVideoSpy = jest.spyOn(component,'getMovieVideos');
    component.detailsMovie(mockMovieId);

    expect(getMovieVideoSpy).toHaveBeenCalledWith(mockMovieId)
  })

  it('should set loading to false after getMovieDetails completes', () => {
    jest.spyOn(movies, 'getMovieDetails').mockReturnValue(of(mockMovieDetails));
  
    component.detailsMovie(mockMovieId);
  
    //observable completes immediately check the final state
    expect(component.loading).toBe(false);
    expect(component.movieDetails).toEqual(mockMovieDetails);
  });
  

  it('should handle error when getMovieDetails fails' ,() => {
    jest.spyOn(movies,'getMovieDetails').mockReturnValue(throwError('error occured while fetching the data '));
    component.detailsMovie(mockMovieId);

    expect(component.movieDetails).toBeNull();
    expect(component.loading).toBeFalsy();
  })

  it('should not all if loadSimilarMovies or getMovieVideos if getMovieDetails fails' , () => {

    jest.spyOn(movies,'getMovieDetails').mockReturnValue(throwError('Error occurred while fetching movie details'));
    const loadSimilarMoviesSpy = jest.spyOn(component,'loadSimilarMovies');
    const getMovieVideoSpy = jest.spyOn(component,'getMovieVideos');
    
    component.detailsMovie(mockMovieId);

    expect(loadSimilarMoviesSpy).not.toHaveBeenCalled();
    expect(getMovieVideoSpy).not.toHaveBeenCalled();
  })

  it('should set movieDetails to null if movie ID is invalid' , () => {
    const invalidMovieId = 1;
    jest.spyOn(movies,'getMovieDetails').mockReturnValue(of(null));
    component.detailsMovie(invalidMovieId);
    expect(component.movieDetails).toBeNull();
  })

  it('should set videos property with API response', () => {
    jest.spyOn(movies, 'getMovieVideo').mockReturnValue(of(mockMovieVideoResponeSpy));
  
    component.getMovieVideos(mockMovieId);
  
    expect(movies.getMovieVideo).toHaveBeenCalledWith(mockMovieId);
    expect(component.videos).toEqual(mockMovieVideoResponeSpy.results);
  });
  it('should set trailerUrl when YouTube trailer is found', async () => {
    jest.spyOn(movies,'getMovieVideo').mockReturnValue(of(mockMovieVideoResponeSpy));
    const sanitiserSpy = jest.spyOn(component['sanitiser'],'bypassSecurityTrustResourceUrl');
    const expectedUrlSpy = `https://www.youtube.com/embed/${mockMovieVideoResponeSpy.results[0].key}`

    component.getMovieVideos(mockMovieId);

    expect(sanitiserSpy).toHaveBeenCalledWith(expectedUrlSpy);
    expect(component.trailerUrl).toBeTruthy();
  })

  it('should set trailer to null if their is no trailer' , async() =>  {
    const mockNoTrailerResponse :{results:VideoResponse[]} = {
      results:[]
    }

    jest.spyOn(movies,'getMovieVideo').mockReturnValue(of(mockNoTrailerResponse))
    

    await component.getMovieVideos(mockMovieId);

    expect(component.videos).toEqual([]);
    expect(component.trailerUrl).toBeNull();
  })
  
  it('should set loading to false after API response', () => {
    jest.spyOn(movies,'getMovieVideo').mockReturnValue(of(mockMovieVideoResponeSpy))

    component.getMovieVideos(mockMovieId);

    expect(component.loading).toBeFalsy();
  })

it('should get the similar movies successfully' , async() => {

  const MockServiceSpy =jest.spyOn(movies, 'getSimilarMovies').mockReturnValue(of(mockSimilarMoviesResponse));

  component.loadSimilarMovies(mockMovieId);

  expect(component.similarMovies).toEqual(mockSimilarMoviesResponse.results)
  expect(MockServiceSpy).toHaveBeenCalledWith(mockMovieId)
})

it('should not load similar movies when the response is empty', () => {
  const mockEmptySimilarMoviesResponse = {
    results: [],
  };

  jest.spyOn(movies,'getSimilarMovies').mockReturnValue(of(mockEmptySimilarMoviesResponse));

  expect(component.similarMovies).toEqual([]);
})
});
