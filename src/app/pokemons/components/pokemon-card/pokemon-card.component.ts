import {Component, computed, input} from '@angular/core';
import {SimplePokemon} from '../../interfaces';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styles: ``
})
export class PokemonCardComponent {
  public pokemon = input.required<SimplePokemon>();

  public pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`
  )
  /*logEffect = effect(() => {
    console.log('PokemonCard', this.pokemon());
  });*/
}
