import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMovieComponent } from './no-movie.component';

describe('NoMovieComponent', () => {
  let component: NoMovieComponent;
  let fixture: ComponentFixture<NoMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoMovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No Movies Found" heading', () => {
    const headingElement: HTMLElement = fixture.nativeElement.querySelector('.content');
    expect(headingElement).toBeTruthy();
    expect(headingElement.textContent).toContain('No Movies Found'); 
  });

  it('should display suggestion message', () => {
    const suggestionElement: HTMLElement = fixture.nativeElement.querySelector('.suggestion');
    expect(suggestionElement).toBeTruthy(); 
    expect(suggestionElement.textContent).toContain('Try searching for another movie or check your spelling.');
  });
});
