import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from 'routes/Home';
import Gallery from './Gallery';
import Challenges from './Challenges';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/gallery', element: <Gallery /> },
  { path: '/challenges', element: <Challenges /> },
]);

export default router;
