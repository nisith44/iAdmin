import './App.css';
import { Route } from 'react-router';
import Dashboard from './components/dashboard';

function App() {
  return (
    <div className="App">
      <Route path="/dashboard" component={Dashboard} />
    </div>
  );
}

export default App;
