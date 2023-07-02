import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./componets/Header";
import Home from "./componets/Home";
import Coins from "./componets/Coins";
import { CoinDetails } from "./componets/CoinDetails";
import Exchanges from "./componets/Exchanges";
import Footer from "./componets/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Coins" element={<Coins/>}/>
          <Route path="/Coins/:id" element={<CoinDetails/>}/>
          <Route path="/Exchanages" element={<Exchanges/>}/>
         
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
