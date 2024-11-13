import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GetDetailsService {

  constructor(private router:Router) { }

  viewMovieDetails(id: number): void {
    this.router.navigate(['/details', id]);
  }
}
