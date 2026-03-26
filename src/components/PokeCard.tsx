import { useState, useEffect } from "react";
import "./PokeCard.css";

export type Pokemon = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    type: { name: string };
  }>;
};

type PokeCardProps = {
  pokemon: Pokemon;
};

export function PokeCard({ pokemon }: PokeCardProps) {
  const [favorito, setFavorito] = useState(() => {
    const favoritos = JSON.parse(localStorage.getItem("meusFavoritos") || "[]");
    return favoritos.includes(pokemon.name);
  });

  useEffect(() => {
    const nomeFormatado = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    console.log(`Pokémon ${nomeFormatado} carregado com sucesso!`);
  }, [pokemon]);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem("meusFavoritos") || "[]");
    
    if (favorito) {
      if (!favoritos.includes(pokemon.name)) {
        favoritos.push(pokemon.name);
        localStorage.setItem("meusFavoritos", JSON.stringify(favoritos));
      }
    } else {
      const novosFavoritos = favoritos.filter((nome: string) => nome !== pokemon.name);
      localStorage.setItem("meusFavoritos", JSON.stringify(novosFavoritos));
    }
  }, [favorito, pokemon.name]);

  return (
    <div className="pokecard-container">
      <div className="pokecard-header">
        <h3 className="pokecard-name">
          {pokemon.name} {favorito && "⭐"}
        </h3>
      </div>
      
      {pokemon.sprites.front_default && (
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokecard-image"
        />
      )}

      <div className="pokecard-stats">
        <div>
          <strong>Altura</strong> 
          <span>{pokemon.height * 10} cm</span>
        </div>
        <div>
          <strong>Peso</strong> 
          <span>{pokemon.weight / 10} kg</span>
        </div>
        <div>
          <strong>Tipos</strong> 
          <span>{pokemon.types.map((t) => t.type.name).join(" / ")}</span>
        </div>
      </div>

      <button 
        className={`pokecard-button ${favorito ? 'btn-favoritado' : 'btn-normal'}`}
        onClick={() => setFavorito(!favorito)}
      >
        {favorito ? "Remover dos Favoritos" : "⭐ Favoritar"}
      </button>
    </div>
  );
}