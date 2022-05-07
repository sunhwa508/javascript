import React from 'react';
import { Header } from 'semantic-ui-react';
import Gnb from './Gnb';
const Top = () => {
  return (
    <div>
      <img src="/images/console.png" alt="logo" style={{ width: 100 }} />
      <Header as="h1">코딩앙마</Header>
      <Gnb />
    </div>
  );
};

export default Top;
