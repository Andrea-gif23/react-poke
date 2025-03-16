import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estados
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Función para manejar el cambio en el input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // useEffect para hacer la petición cada vez que el término de búsqueda cambie
  useEffect(() => {
    if (searchTerm === '') {
      setPokemonData(null);
      setError('');
      return;
    }

    const fetchPokemon = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (err) {
        setError(err.message);
        setPokemonData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [searchTerm]);

  return (
    <div>
      <h1>Buscador de Pokémon</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Escribe el nombre de un Pokémon"
        autoFocus
      />
      
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      
      {pokemonData && !loading && !error && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>ID: {pokemonData.id}</p>
          <p>Altura: {pokemonData.height}</p>
          <p>Peso: {pokemonData.weight}</p>
        </div>
      )}
    </div>
  );
}

export default App;

