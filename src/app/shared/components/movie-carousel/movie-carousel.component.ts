import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AllMovies } from '../../models/movie-model';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GetDetailsService } from '../../services/get-details.service';
import { CarouselModule } from 'primeng/carousel';
import { ImagePipe } from '../../pipes/image-pipe.pipe';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink,CarouselModule,ImagePipe],
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.scss'],
})
export class MovieCarouselComponent implements OnInit {
  @Input() mainContent: AllMovies[] = [];
  @Input() generName: string = '';
  @Output() loadMoreMovies = new EventEmitter<void>(); 


  constructor(private router: Router ,private details:GetDetailsService) {}

  ngOnInit(): void {}

  getMovieDtails(id: number | null): void {

    if(id == null || id <=0) return;
    this.details.viewMovieDetails(id )
  }
}
