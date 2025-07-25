import axios from "axios";
import type { PokemonStats, PokemonType, Move } from "../types/pokemon";

const BASE_URL = "https://pogoapi.net/api/v1";

export const fetchPokemonStats = async (): Promise<PokemonStats[]> => {
  const response = await axios.get(`${BASE_URL}/pokemon_stats.json`);
  return response.data as PokemonStats[];
};

export const fetchPokemonTypes = async (): Promise<PokemonType[]> => {
  const response = await axios.get(`${BASE_URL}/pokemon_types.json`);
  return response.data as PokemonType[];
};

export const fetchFastMoves = async (): Promise<Move[]> => {
  const response = await axios.get(`${BASE_URL}/fast_moves.json`);
  return response.data as Move[];
};

export const fetchChargedMoves = async (): Promise<Move[]> => {
  const response = await axios.get(`${BASE_URL}/charged_moves.json`);
  return response.data as Move[];
};
