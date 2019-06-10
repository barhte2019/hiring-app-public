import React from 'react';
import ReactDOM from 'react-dom';
import TopJobs from './top-jobs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopJobs />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// TODO: Test menu contents
