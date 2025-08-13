const PokeCard = ({pokemon})=>{
  return(
    <div className="rounded my-2 p-2 shadow-md hover:shadow-xl max-w-lg text-center">
 
        <img className="w-lg" src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>{pokemon.name}</p>
    </div>
  )
}
export default PokeCard;