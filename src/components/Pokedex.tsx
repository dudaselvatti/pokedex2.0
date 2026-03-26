import { useState } from "react";
import { PokeCard, type Pokemon } from "./PokeCard";
import "./Pokedex.css";

export default function Pokedex() {
  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const [listaPokemons, setListaPokemons] = useState<Pokemon[]>([]);

  const buscarPokemon = async () => {
    if (!nome.trim()) return;

    setCarregando(true);
    setErro("");

    try {
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`
      );
      
      if (!resposta.ok) throw new Error("Pokémon não encontrado");

      const dados: Pokemon = await resposta.json();

      const jaExiste = listaPokemons.find((p) => p.name === dados.name);
      
      if (!jaExiste) {
        setListaPokemons((listaAnterior) => [dados, ...listaAnterior]);
      } else {
        setErro("Esse Pokémon já está na sua tela!");
      }
      
      setNome("");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setErro("Pokémon não encontrado 😢");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={`pokedex-container ${listaPokemons.length >= 3 ? "expandido" : ""}`}>
      <h2 className="pokedex-title">🔎 Pokédex</h2>

      <input
        className="pokedex-input"
        type="text"
        placeholder="Digite o nome do Pokémon"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <button className="pokedex-button" onClick={buscarPokemon}>
        Buscar
      </button>

      {carregando && <p className="pokedex-loading">Carregando...</p>}
      {erro && <p className="pokedex-error">{erro}</p>}

      <div className="pokedex-grid">
        {listaPokemons.map((pokemon) => (
          <PokeCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}