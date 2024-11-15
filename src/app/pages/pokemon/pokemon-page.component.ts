import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Pokemon} from '../../pokemons/interfaces';
import {PokemonsService} from '../../pokemons/services/pokemons.service';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styles: ``
})
export default class PokemonPageComponent implements OnInit {
  public pokemon: WritableSignal<Pokemon | null> = signal<Pokemon | null>(null);
  private pokemonsService: PokemonsService = inject(PokemonsService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private title: Title = inject(Title);
  private meta: Meta = inject(Meta);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.pokemonsService.loadPokemon(id)
      .pipe(
        tap(({ name, id }) => {
          const pageTitle = `#${id} - ${name}`;
          const pageDescription = `Página del Pokémon ${name}`;

          this.title.setTitle(pageTitle);
          this.meta.updateTag({
            name: 'description',
            content: pageDescription
          });
          this.meta.updateTag({
            name: 'og:title',
            content: pageTitle
          });
          this.meta.updateTag({
            name: 'og:description',
            content: pageDescription
          });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          });

        })
      )
      .subscribe(pokemon => {
      this.pokemon.set(pokemon);
    })
  }
}
