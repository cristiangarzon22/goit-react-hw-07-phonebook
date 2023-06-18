import React from 'react';
import Bar from './addBar';
import List from './contactList';
import ErrorBoundary from 'ErrorBoundary';
const App = () => {
  return (
    <>
      <ErrorBoundary>
        <Bar />
      </ErrorBoundary>
      <ErrorBoundary>
        <List />
      </ErrorBoundary>
    </>
  );
};

export default App;
