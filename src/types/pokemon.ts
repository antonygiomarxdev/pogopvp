export interface PokemonStats {
  pokemon_name: string;
  form: string;
  base_attack: number;
  base_defense: number;
  base_stamina: number;
  cp: number;
}

export interface PokemonType {
  pokemon_name: string;
  type: string[];
}

export interface Move {
  move_id: string;
  move_name: string;
  type: string;
  power: number;
  duration: number;
  energy_delta: number;
}
