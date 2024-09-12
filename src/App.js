import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Accueil/Navbar';
import Home from "./pages/HomePage"
import Footer from './components/Accueil/Footer';
import LieuxDeCulte from './pages/LieuxDeCulte';
import Sacrements from "./pages/Sacrements"
import Jeunesse from './pages/Jeunesse';
import VieDeLaParoisse from './pages/VieDeLaparoisse';

const App = () => {
  return (
        <Router>
          <Navbar />
          <div className="flex flex-col xl:gap-y-12 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/LieuxDeCulte" element={<LieuxDeCulte />} />
              <Route path="/Sacrements" element={<Sacrements />} />
              <Route path="/Jeunesse" element={<Jeunesse />} />
              <Route path="/VieDelaParoisse" element={<VieDeLaParoisse />} />

            </Routes>
          </div>

          <Footer />
        </Router>
  );
}

export default App;