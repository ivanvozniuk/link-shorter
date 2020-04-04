import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../store/rootReducer';

const initReduxDevtools = () =>
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, compose(applyMiddleware(thunk), initReduxDevtools()));

const StoreProvider = ({ ...props }) => <Provider {...props} store={store} />;

export default StoreProvider;
