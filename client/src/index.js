import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducers from './features/user'
import postReducers from './features/posts'
import analyticsReducers from './features/analytics'
import App from './App';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const rootReducer = {
  user: userReducers,
  posts: postReducers,
  analytics: analyticsReducers,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), thunk],
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
