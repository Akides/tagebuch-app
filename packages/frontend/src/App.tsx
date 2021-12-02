import React, { Fragment } from "react";
import { GlobalStyle } from "./globalStyles";
import { Theme } from "./Themes"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CardsView } from "./pages/CardsView";
import { EntryView } from "./pages/EntryView";

export const App = () => {
  return (
  <Fragment>
    <GlobalStyle/>
    <Theme>
      <Router>

        <Routes>
          <Route path="/" element={<CardsView/>} />
          <Route path="/entryview/:id" element={<EntryView/>} />
          <Route path="/cardview" element={<CardsView/>} />
        </Routes>

      </Router>
      </Theme>

  </Fragment>
  )
};