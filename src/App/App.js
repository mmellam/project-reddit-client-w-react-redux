import './App.css';
import SearchBar from '../components/SearchBar/SearchBar';
import PostOverview from '../components/Posts/PostOverview';
import SavedPosts from '../components/SavedPosts/SavedPosts';

function App() {
  return (
    <div className="App">
      <header>
        <h1>OnePage Reddit</h1>
        <p>View posts and comments from reddit.com all on one page!</p>
      </header>
      <SearchBar />
      <PostOverview />
      <SavedPosts />
      <footer>React-Redux project by Melanie Bucher</footer>
    </div>
  );
}

export default App;
