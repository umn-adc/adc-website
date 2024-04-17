import React from 'react';
import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import Home from 'routes/Home';
import Gallery from './Gallery';
import Challenges from './Challenges';

// ? GitHub hosting does not support anything but hash routing
// TODO: figure out hosting to use BrowserRouter instead
const router = createHashRouter([
  { path: '/', element: <Home /> },
  { path: '/gallery', element: <Gallery /> },
  { path: '/challenges', element: <Challenges /> },
]);

export default router;
