import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { PokemonStats, PokemonType, PokemonMoves } from "../types/pokemon";

const BASE_URL = "https://pogoapi.net/api/v1";

export const usePokemonStats = () => {
  return useQuery<PokemonStats[]>({
    queryKey: ["pokemonStats"],
    queryFn: async () => {
      const response = await axios.get<PokemonStats[]>(
        `${BASE_URL}/pokemon_stats.json`
      );
      return response.data;
    },
  });
};

export const usePokemonTypes = () => {
  return useQuery<PokemonType[]>({
    queryKey: ["pokemonTypes"],
    queryFn: async () => {
      const response = await axios.get<PokemonType[]>(
        `${BASE_URL}/pokemon_types.json`
      );
      return response.data;
    },
  });
};

export const useMoves = () => {
  return useQuery<PokemonMoves[]>({
    queryKey: ["pokemonMoves"],
    queryFn: async () => {
      const response = await axios.get<PokemonMoves[]>(
        `${BASE_URL}/current_pokemon_moves.json`
      );
      return response.data;
    },
  });
};
