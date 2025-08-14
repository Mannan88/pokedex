import Home from './screens/Home';
import './App.css';
import PokemonInfo from './screens/PokemonInfo';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return(
    <div>
   <Router>
        <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/:pokename" element={<PokemonInfo />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
