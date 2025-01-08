const PokemonPreview = ({ pokemon, onSelect }) => {
    return (
      <article 
        className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer" 
        onClick={() => onSelect(pokemon)}
      >
        <h3>{pokemon.name}</h3>
        {/* Aggiungi eventuali altre informazioni visive sul Pokémon */}
      </article>
    );
  };
  