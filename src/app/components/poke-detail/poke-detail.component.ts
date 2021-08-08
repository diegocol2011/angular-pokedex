import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '-';
  divisorArray: any[] = ['-'];
  pokemonImg = '';
  pokemonType = [];
  pokemonAbility = [];
  
  constructor(private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService) {

    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']);
      }
    )
  }

  ngOnInit(): void {
  }

  getPokemon(id) {
    this.pokemonService.getPokemon(id).subscribe(
      res => {
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        res.types.forEach(element => {
          this.pokemonType += element.type.name + this.divisorArray;
        });
        res.abilities.forEach(element => {
          this.pokemonAbility += element.ability.name + this.divisorArray;
        });
      },
      err => {
        console.log(err);
      }
    )
  }

}
