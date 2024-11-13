import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule,HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should debounce and call onSearch when query is updated', (done) => {
    jest.useFakeTimers();
    
    // Spy on the onSearch method
    const onSearchSpy = jest.spyOn(component, 'onSearch');
    
    component.query = 'test';
    component.onQueryChange({ target: { value: 'test' } });
    
    // Fast-forward time to allow debounce to trigger
    jest.advanceTimersByTime(500);
    
    expect(onSearchSpy).toHaveBeenCalled(); // Check if onSearch was called
    done();
  });
  
  
  it('should navigate to /search with the correct query', () => {
    component.query = 'movie';
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.onSearch();
    
    expect(navigateSpy).toHaveBeenCalledWith(['/search'], { queryParams: { q: 'movie' } });
  });

  it('should routers navigate function when goBack function is called', () => {
    jest.spyOn(router, 'navigate');
    component.backPage();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);

  });
});
