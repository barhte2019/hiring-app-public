import React from 'react';
import ReactDOM from 'react-dom';
import PopularCategories from './popular';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PopularCategories />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// TODO: Test menu contents
