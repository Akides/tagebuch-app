import React, { Fragment } from "react";
import { Content } from "./components/Content";
import { GlobalStyle } from "./globalStyles";

export const App = () => {
  return (
  <Fragment>
    <GlobalStyle/>
      <Content/>
  </Fragment>
  )
};