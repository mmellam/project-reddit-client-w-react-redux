import './App.css';
import SearchBar from '../components/SearchBar/SearchBar';
import PostOverview from '../components/Post/PostOverview';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <PostOverview />
      <header className="App-header">
        <img src='#' className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
