export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('savedPostsState');
      if (serializedState === null) {
        return [];
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return [];
    }
  };
  //const persistedState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : [];

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('savedPostsState', serializedState);
    } catch (e) {
        console.log(e);
    }
};

// code based on tutorial by Dan Abramov (source: https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage)