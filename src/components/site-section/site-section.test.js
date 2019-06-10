import React from 'react';
import ReactDOM from 'react-dom';
import SiteSection from './site-section';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SiteSection />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// TODO: Test menu contents
