import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/HomePage"
import PreviewPage from './pages/PreviewPage';

const App = () => {
  return (
        <Router>
          <div className="flex flex-col xl:gap-y-12 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/PreviewPage" element={<PreviewPage />} />
            </Routes>
          </div>
        </Router>
  );
}

export default App;