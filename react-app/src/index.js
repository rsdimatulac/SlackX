import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from "./context/Modal";
import { FormModalContext } from "./context/FormModalContext";
import './index.css';
import App from './App';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <FormModalContext>
          <App />
        </FormModalContext>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
