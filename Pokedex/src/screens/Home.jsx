import { useState , useEffect } from "react";
import axios from 'axios';
import PokeCard from "../components/PokeCard";
import DisplayAllPokemons from "../components/DisplayAllPokemons";
function Home(){

  return (
    <div>
     <DisplayAllPokemons/>
    </div>
  );
}
export default Home;