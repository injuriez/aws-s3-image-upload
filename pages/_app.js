// pages/_app.js
import React from 'react';
import Head from 'next/head';
import '../app/globals.css';
import Navbar from '../components/navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;