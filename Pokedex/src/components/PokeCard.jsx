const PokeCard = ({ pokemon }) => {
  return (
    <div className="rounded my-2 p-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl max-w-lg text-center">
      <a href={pokemon.name}>
        <img className="w-60 mx-auto transition-all duration-300 ease-in-out hover:-translate-y-3"
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name} />
        <p className="font-mono text-2xl">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
      </a>
    </div>
  )
}
export default PokeCard;