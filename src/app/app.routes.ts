import { Routes } from '@angular/router';
import { SearchComponent } from './core/components/search/search.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent:() => 
        import('./pages/browse/browse.component').then(
            (movie) => movie.BrowseComponent
        )
     }, 
    { path: 'details/:id', loadComponent: ()=>
        import('./shared/components/movie-details/movie-details.component').then(
            (movie) => movie.MovieDetailsComponent

        ),
     },
     {path:'search', component:SearchComponent}

     
];
