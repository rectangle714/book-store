import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import promiseMiddleware from "redux-promise";
import rootReducer from './store/index';

const store = configureStore({
  reducer: rootReducer,
  middleware: [promiseMiddleware],
  devTools: process.env.NODE_ENV !== 'production'
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
      <BrowserRouter>
            <App />
      </BrowserRouter>
  </Provider>
);