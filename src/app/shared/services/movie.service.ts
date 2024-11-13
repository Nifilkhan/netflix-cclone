import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AllMovies,
  Geners,
  VideoResponse,
} from '../models/movie-model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';



const headers = new HttpHeaders(
  environment.headers
)

const params = new HttpParams({
  fromObject:environment.params
})
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}


  private API_URL = environment.ALL_MOVIES_URL;
  readonly ADDON = '/movie';

  getMovies(page: number): Observable<{ results: AllMovies[] }> {
    // console.log('movie loading in page :', page);
    const options = this.getOptions(page);
    // console.log('options for page :', page, ':', options);
    return this.http.get<{ results: AllMovies[] }>(
      this.API_URL + 'discover' + this.ADDON,
      {params , headers}
    );
  }

  getGenres(): Observable<{ genres: Geners[] }> {
    const options = this.getOptions();
    return this.http.get<{ genres: Geners[] }>(
       this.API_URL + 'genre' + this.ADDON +'/list',
       {params , headers}
    );
  }

  getMovieDetails(id: number) {
    const options = this.getOptions();
    return this.http.get<any>(
       this.API_URL + this.ADDON +`/${id}`,
       {params , headers}
    );
  }

  getSimilarMovies(
    id: number
  ): Observable<{ results: AllMovies[] }> {
    const options = this.getOptions();
    return this.http.get<{ results: AllMovies[] }>(
      this.API_URL + this.ADDON + `/${id}/similar?`,
      {params , headers}
    );
  }

  getOptions(page?: number , query?: string){
    const params = {
        ...environment.params,
      ...(page && { page: page.toString()}),
         ...(query&& {query : query})
    };
    return {
      params: params,
      headers: environment.headers,
    };
  }

  getNowPlayingMovies(page?: number):Observable<{results:AllMovies[]}> {
    const options = this.getOptions(page);
    return this.http.get<{results: AllMovies[]}>( this.API_URL+ this.ADDON +'/now_playing',  {params , headers});
  }

  getPopularMovies(page?: number):Observable<{results:AllMovies[]}>{
    const options = this.getOptions(page);
    return this.http.get<{results: AllMovies[]}>( this.API_URL + this.ADDON + '/popular',  {params , headers});
  }

  getUpCommingMovies(page?: number):Observable<{results:AllMovies[]}>{
    const options = this.getOptions(page);
    return this.http.get<{results: AllMovies[]}>( this.API_URL + this.ADDON +'/upcoming',  {params , headers});
  }

  getTopRatedMovies(page?: number):Observable<{results:AllMovies[]}>{
    const options = this.getOptions(page);
    return this.http.get<{results: AllMovies[]}>( this.API_URL + this.ADDON + '/top_rated',  {params , headers});
  }

  getMovieVideo(id: number):Observable<{results: VideoResponse[]}>  {
    const options = this.getOptions();
    return this.http.get<{results: VideoResponse[]}>( this.API_URL + this.ADDON + `/${id}/videos`, {params , headers})
  }

  searchMovies(query: string, page?: number): Observable<{ results: AllMovies[] }> {
    const url = this.API_URL + 'search' + this.ADDON;
    const options = this.getOptions(page, query);
    return this.http.get<{ results: AllMovies[] }>(url,  {params , headers});
  }

}
