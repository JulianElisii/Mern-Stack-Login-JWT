import { BrowserRouter, Link } from 'react-router-dom';

import RoutesForm from './routes/Routes';


function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <RoutesForm />
      </BrowserRouter>

    </div>
  );
}

export default App;
