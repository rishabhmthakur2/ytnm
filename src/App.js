import React, { useState, useCallback, useEffect } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import About from './Components/About';
import Gallery from './Components/Gallery';
import Landing from './Components/Landing';
import Team from './Components/Team';
import Video from './Components/Video';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/landing' element={<Landing />} />
        <Route exact path='/' element={<Video />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/team' element={<Team />} />
        <Route exact path='/gallery' element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
