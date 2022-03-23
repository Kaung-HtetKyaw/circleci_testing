import logo from './logo.svg';
import './App.css';
import uipackage from '@circleci_testing/repo-ui';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    uipackage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Continuous Integration with CircleCI</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          You can read more about this
          <a href="https://circleci.com/docs/2.0">here</a>
        </a>
      </header>
    </div>
  );
}

export default App;
