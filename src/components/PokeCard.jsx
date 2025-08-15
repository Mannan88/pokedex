import { Link } from 'react-router-dom';

const PokeCard = ({ pokemon }) => {
  return (
    <div className="rounded my-2 p-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl max-w-lg text-center">
      <Link to={`/${pokemon.name}`}>
        <img
          className="w-60 mx-auto transition-all duration-300 ease-in-out hover:-translate-y-3"
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
        />
        <p className="font-mono text-2xl">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </p>
      </Link>
    </div>
  );
};

export default PokeCard;
