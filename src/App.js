import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Visualizer from './Visualizer/Visualizer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Visualizer />
      </BrowserRouter>
    </div>
  );
}

export default App;
