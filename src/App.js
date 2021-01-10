import React from 'react';

import { BrowserRouter } from "react-router-dom"
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import thunk from "redux-thunk";
import socketMiddleware from './state/middlewares/socketMiddleware';
import Socket from './utils/socket'
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import Reducer from './state'
import Routes from "./routes/";

const store = createStore(
  Reducer, 
  composeWithDevTools(
    applyMiddleware(
      thunk, 
      // socketMiddleware
    )
  )
);

Socket.setStore(store)

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
