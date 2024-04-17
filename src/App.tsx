import React from 'react';
import Header from 'components/Header';
import { AppContainer, RouteContainer } from 'styles';
import Footer from 'Footer';
import Sidebar from 'components/Sidebar';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RouterProvider } from 'react-router-dom';
import router from 'routes/router';

const App: React.FC = () => {
  return (
    <AppContainer
      className="App"
      style={{ overflowX: 'clip' }}
      id="outer-container"
    >
      <Sidebar pageWrapId="page-wrap" outerContainerId="outer-container" />
      <Header />
      <RouteContainer>
        <RouterProvider router={router} />
      </RouteContainer>
      <Footer />
    </AppContainer>
  );
};

export default App;
