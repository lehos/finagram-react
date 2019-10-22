import React from 'react';
import { configure, addDecorator } from '@storybook/react';

const WithGlobalStyles = story => (
  <div id="app">
    <div style={{ padding: '10px' }}>
      {story()}
    </div>
  </div>
);

addDecorator(WithGlobalStyles);

const req = require.context('../src/ui', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
