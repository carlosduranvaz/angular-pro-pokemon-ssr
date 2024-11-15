import {Component, inject, OnInit, signal} from '@angular/core';
import {
  PokemonListComponent
} from '../../pokemons/components/pokemon-list/pokemon-list.component';
import {
  PokemonListSkeletonComponent
} from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import {PokemonsService} from '../../pokemons/services/pokemons.service';
import {SimplePokemon} from '../../pokemons/interfaces';
import {ActivatedRoute, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {delay, first, map, tap} from 'rxjs';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent
  ],
  templateUrl: './pokemons-page.component.html',
  styles: ``
})
export default class PokemonsPageComponent implements OnInit{

  private pokemonsService: PokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap
      .pipe(
        map(params => params.get('page') ?? '1'),
        map(page => (isNaN(+page)) ? 1 : +page),
        map(page => Math.max(1, page))
      )
  )


 // public isLoading = signal<boolean>(false);

 // private appRef = inject(ApplicationRef);

 /*private $appState = this.appRef.isStable.subscribe( isStable => {
   console.log({ isStable });
 })*/

 ngOnInit() {

   this.loadPokemons(0);
   /*setTimeout(() => {
     this.isLoading.set(false);
   }, 5000);*/
 }

 loadPokemons(page: number) {
   const pageToLoad = this.currentPage()! + page;

   this.pokemonsService.loadPage(pageToLoad)
     .pipe(
       tap(() => this.router.navigate([], { queryParams: { page: pageToLoad}})),
       tap(() => this.title.setTitle(`Pokémons SSR - Page ${ pageToLoad }`)),
       first()
     )
     .subscribe(pokemons => {
       this.pokemons.set(pokemons);
     });
 }

 /*ngOnDestroy() {
   this.$appState.unsubscribe();
 }*/
}
