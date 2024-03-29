import {applyMiddleware, createStore} from 'redux';

// import {apiMiddleware} from 'redux/-api-middleware';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import reducer from './reducers'
// import thunkMiddleware from 'redux-thunk'

const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL:'http://mysceal-sv.computing.dcu.ie/api',
  responseType: 'json'
});

function configureStore(initialState = {}) {
  const middlewares = [axiosMiddleware(client)]
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(reducer, initialState);
}

export default configureStore;
