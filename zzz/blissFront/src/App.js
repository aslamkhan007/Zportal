import React from "react";
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/global.scss';

import Routes from "./Routes";
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
