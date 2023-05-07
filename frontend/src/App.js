import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Card from './components/Card';
import Summary from './pages/Summary';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="moreinfo" element={<Summary />} />
          <Route path="form" element={<Card/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
