import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { configureStore } from '@reduxjs/toolkit';
// import { AuthContextProvider } from './store/auth-context';
import promiseMiddleware from "redux-promise";
import rootReducer from './store/index';

const store = configureStore({
  reducer: rootReducer,
  middleware: [promiseMiddleware],
  devTools: process.env.NODE_ENV !== 'production'
})

// const createSotreMiddleware = applyMiddleware(
//   promiseMiddleware,
//   reduxThunk
// )(createStore);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <AuthContextProvider>
  <Provider store={store}>
      <BrowserRouter>
            <App />
      </BrowserRouter>
  </Provider>
  // </AuthContextProvider>
);