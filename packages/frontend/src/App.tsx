/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import { Content } from "./components/Content";
import { Theme } from "./Themes"
import { GlobalStyle } from "./globalStyles";

export const App = () => {
  return (
  <Fragment>
    <GlobalStyle/>
    <Theme>
      <Content/>
    </Theme>
  </Fragment>
  )
};