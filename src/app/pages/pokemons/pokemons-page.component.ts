import {Component, OnInit} from '@angular/core';
import {
  PokemonListComponent
} from '../../pokemons/components/pokemon-list/pokemon-list.component';
import {
  PokemonListSkeletonComponent
} from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';

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
 // public isLoading = signal<boolean>(true);

 // private appRef = inject(ApplicationRef);

 /*private $appState = this.appRef.isStable.subscribe( isStable => {
   console.log({ isStable });
 })*/

 ngOnInit() {
   /*setTimeout(() => {
     this.isLoading.set(false);
   }, 5000);*/
 }

 /*ngOnDestroy() {
   this.$appState.unsubscribe();
 }*/
}
