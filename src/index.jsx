/* CSS */
import "./index.css";

import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter ,Routes, Route} from 'react-router-dom'

import reportWebVitals from './reportWebVitals';

import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar';
import Error from "./pages/Error/Error";

import yogaIcon from './assets/icons/sidebar/icon_yoga.svg';
import swimmingIcon from './assets/icons/sidebar/icon_swimming.svg';
import cyclingIcon from './assets/icons/sidebar/icon_cycling.svg';
import liftingIcon from './assets/icons/sidebar/icon_lifting.svg';


const SIDEBAR_ICONS = [
	{ icon: yogaIcon, alt: 'Yoga' },
	{ icon: swimmingIcon, alt: 'Swimming' },
	{ icon: cyclingIcon, alt: 'Cycling' },
	{ icon: liftingIcon, alt: 'Strength Training' },
];


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Sidebar icons={SIDEBAR_ICONS}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/:id' element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
