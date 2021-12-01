import React, { Fragment } from "react";
import { Content } from "./components/Content";
import { GlobalStyle } from "./globalStyles";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CardsView } from "./pages/CardsView";
import { EntryView } from "./pages/EntryView";

export const App = () => {
  return (
  <Fragment>
    <GlobalStyle/>

      <Router>

        <Routes>
          <Route path="/" element={<Content/>} />
          <Route path="/entryview/:id" element={<EntryView/>} />
          <Route path="/cardview" element={<CardsView/>} />
        </Routes>

      </Router>

  </Fragment>
  )
};