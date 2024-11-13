import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCarouselComponent } from './movie-carousel.component';
import { MovieService } from '../../services/movie.service';
import { GetDetailsService } from '../../services/get-details.service';
import { mock } from 'node:test';

describe('MovieCarouselComponent', () => {
  let component: MovieCarouselComponent;
  let fixture: ComponentFixture<MovieCarouselComponent>;
  let details : GetDetailsService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCarouselComponent);
    details = TestBed.inject(GetDetailsService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoul get the correct ID movie that passed as a parameter in the function' , () =>  {
    const mockId = 232343;
    const data = jest.spyOn(details,'viewMovieDetails');
    component.getMovieDtails(mockId);

    expect(data).toHaveBeenCalledWith(mockId);
  })

 
  it('should not call viewMovieDetails if there is no ID', () => {
    const mockId = null; 
    const viewMovieDetailsSpy = jest.spyOn(details, 'viewMovieDetails'); 
  
    component.getMovieDtails(mockId); 
  
    expect(viewMovieDetailsSpy).not.toHaveBeenCalled();
  });
  
});


