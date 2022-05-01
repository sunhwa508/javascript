import React from 'react';
import { Menu } from 'semantic-ui-react';

const items = [
  { key: 'HOME', name: 'HOME' },
  { key: 'Messages', name: 'Messages' },
  { key: 'event', name: 'event' },
];

const Gnb = () => <Menu items={items} />;

export default Gnb;
