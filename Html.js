import React from "react";
import { ServerStyleSheet } from "styled-components";

export default ({ App, render }) => {
    const sheet = new ServerStyleSheet();
    const { Main, State, Script } = render(sheet.collectStyles(<App />));
  
    return (
      <html>
        <head>
            {sheet.getStyleElement()}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css" integrity="sha384-B41nY7vEWuDrE9Mr+J2nBL0Liu+nl/rBXTdpQal730oTHdlrlXHzYMOhDU60cwde" crossorigin="anonymous"/>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          <Main />
          <State />
          <Script />
        </body>
      </html>
    );
  };