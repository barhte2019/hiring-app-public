import React from 'react';
import ReactDOM from 'react-dom';
import Cover from './cover';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Cover />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// TODO: Test menu contents
