"use client";

import React, { Fragment } from "react";
import Head from "next/head";

function Home() {

  // useEffect(() => {
  // //   if (darkTheme) {
  // //     document.documentElement.classList.add("dark");
  // //   } else {
  // //     document.documentElement.classList.remove("dark");
  // //   }
  // // }, [darkTheme]);

  return (
    <Fragment>
      <Head>
        <title>Pahadi Rasoi Ghar</title>
        <meta name="description" content="Welcome to Pahadi Rasoi Ghar" />
      </Head>

    </Fragment>
  );
}

export default Home;
