import './App.css';
import SearchBar from '../components/SearchBar/SearchBar';
import PostOverview from '../components/Posts/PostOverview';
import SavedPosts from '../components/SavedPosts/SavedPosts';

// comment everything
function App() {
  return (
    <div className="App">
      <header>
        <h1>OnePage Reddit</h1>
        <h2>View posts and comments all on one page</h2>
      </header>
      <SearchBar />
      <PostOverview />
      <SavedPosts />
      <footer>React-Redux project by Melanie Bucher</footer>
    </div>
  );
}

export default App;
