import React, { Suspense } from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={(<div>Loading...</div>)}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
)

reportWebVitals();
