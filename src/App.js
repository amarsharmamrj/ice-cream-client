import './App.css';
import BaseRouter from './baseRouter';

const dotenv = require('dotenv');
dotenv.config()

function App() {
  return (
    <div>
      <BaseRouter />
    </div>
  );
}

export default App;
