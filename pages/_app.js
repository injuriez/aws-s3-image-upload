// pages/_app.js
import React from 'react';
import '../app/globals.css';
import Navbar from '../components/navbar';
function MyApp({ Component, pageProps }) {
  return <>
  <div className="flex flex-col">
   <Navbar />
   <Component {...pageProps} />
  </div>
  </>;
}

export default MyApp;