import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {
  PokemonListComponent
} from '../../pokemons/components/pokemon-list/pokemon-list.component';
import {
  PokemonListSkeletonComponent
} from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import {PokemonsService} from '../../pokemons/services/pokemons.service';
import {SimplePokemon} from '../../pokemons/interfaces';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {first, map, tap} from 'rxjs';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent,
    RouterLink
  ],
  templateUrl: './pokemons-page.component.html',
  styles: ``
})
export default class PokemonsPageComponent {

  private pokemonsService: PokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params
      .pipe(
        map(params => params['page'] ?? '1'),
        map(page => (isNaN(+page)) ? 1 : +page),
        map(page => Math.max(1, page))
      )
  )

  public loadOnPageChanged = effect(() => {
    console.log('Página cambiada:', this.currentPage());
    this.loadPokemons(this.currentPage()!);
  }, { allowSignalWrites: true });

 loadPokemons(page: number) {
   const pageToLoad = this.currentPage()! + page;

   this.pokemonsService.loadPage(pageToLoad)
     .pipe(
       tap(() => this.title.setTitle(`Pokémons SSR - Page ${ pageToLoad }`)),
       first()
     )
     .subscribe(pokemons => {
       this.pokemons.set(pokemons);
     });
 }
}
