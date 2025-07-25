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
  name: string;
  type: string;
  power: number;
  duration: number;
  energy_delta: number;
  stamina_loss_scaler: number;
}

export interface PokemonMoves {
  charged_moves: string[];
  elite_charged_moves: string[];
  elite_fast_moves: string[];
  fast_moves: string[];
  form: string;
  pokemon_id: number;
  pokemon_name: string;
}
